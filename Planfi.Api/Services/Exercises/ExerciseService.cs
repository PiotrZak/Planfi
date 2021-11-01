using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using WebApi.Data.Entities;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.Models.ViewModels;

namespace PlanfiApi.Services.Exercises
{
    public class ExerciseService : IExerciseService
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _environment;
        private readonly string _bucketName = "planfi-movies";

        public ExerciseService(DataContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment ?? throw new ArgumentNullException(nameof(environment));
        }

        public Exercise Create(Exercise exercise)
        {
            // throw error if the new plan is already taken
            if (_context.exercises.Any(x => x.Name == exercise.Name))
                throw new AppException("Exercise " + exercise.Name + " is already exist");

            _context.exercises.Add(exercise);
            _context.SaveChanges();

            return exercise;
        }
        public Exercise CreateInstance(Exercise exercise)
        {
            _context.exercises.Add(exercise);
            _context.SaveChanges();

            return exercise;
        }
        
        public Task<Exercise> GetById(string id)
        {
            return _context.exercises.FirstOrDefaultAsync(x => x.ExerciseId == id);
        }

        public IEnumerable<Exercise> GetAll()
        {
            return _context.exercises;
        }
        
        public async Task<IEnumerable<ExerciseViewModel>> GetAllByOrganization(string organizationId)
        {
            var organizationCategories = await _context.categories
                .Where(x => x.OrganizationId == organizationId)
                .ToListAsync();
            
            var organizationexercises = new List<ExerciseViewModel>();
            
            foreach(var organizationCategory in organizationCategories)
            {
                var categoryexercises = await _context.exercises
                    .Where(x => x.CategoryId == organizationCategory.CategoryId)
                    .ToListAsync();

                organizationexercises
                    .AddRange(categoryexercises
                    .Select(exercise => new ExerciseViewModel
                {
                    ExerciseId = exercise.ExerciseId,
                    Name = exercise.Name,
                    File = exercise.Files != null && exercise.Files.Any()
                        ? Convert.ToBase64String(exercise.Files[0])
                        : null,
                    CategoryId = exercise.CategoryId,
                    PlanId = exercise.PlanId
                }));
            }
            return organizationexercises;
        }
        
        public IEnumerable<ExerciseViewModel> GetSerializedExercisesInstances()
        {
            var allInstanceexercises = _context.exercises
                .Where(x => 
                    x.Repeats == 0 &&
                    x.Series == 0 &&
                    x.Weight == 0 &&
                    x.Repeats == 0);
            
            var transformedexercises = new List<ExerciseViewModel>();
            
            foreach (var exercise in allInstanceexercises)
            {
                var modelExercise = new ExerciseViewModel
                {
                    ExerciseId = exercise.ExerciseId,
                    Name = exercise.Name,
                    File = exercise.Files != null && exercise.Files.Any()
                        ? Convert.ToBase64String(exercise.Files[0])
                        : null,
                    CategoryId = exercise.CategoryId,
                    PlanId = exercise.PlanId
                };
                
                transformedexercises.Add(modelExercise);
            }

            return transformedexercises;
        }

        public IEnumerable<ExerciseViewModel> GetSerializedExercises()
        {
            return _context.exercises
                .Select(exercise => new ExerciseViewModel
                {
                    ExerciseId = exercise.ExerciseId,
                    Name = exercise.Name,
                    File = exercise.Files != null && exercise.Files.Any()
                        ? Convert.ToBase64String(exercise.Files[0])
                        : null,
                    CategoryId = exercise.CategoryId,
                    PlanId = exercise.PlanId,
                    Series = exercise.Series,
                    Repeats = exercise.Repeats
                })
                .ToList();
        }
        public IEnumerable<Exercise> GetAllOfCategory(string categoryId)
        {
            var exercises = _context.exercises
                .Where(x => x.CategoryId == categoryId);
            return exercises;
        }

        public IEnumerable<Exercise> GetAllOfPlan(string planId)
        {
            var exercises = _context.exercises
                .Where(x => x.PlanId == planId);
            
            return exercises;
        }


        public async Task<int> Delete(string[] ids)
        {
            var exercises = await _context.exercises
                .Where(x => ids.Contains(x.ExerciseId))
                .OrderBy(x => x.ExerciseId)
                .ToListAsync();
            
            var exerciseInstances = _context.exercises
                .Where(x => exercises
                    .Select(y => y.Description)
                        .Contains(x.Description) && exercises
                    .Select(z => z.Name)
                        .Contains(x.Name));
            
            for (var i = 0; i < exercises.Count; i++)
            {
                var files = exercises[i].Files;
                if (files == null) continue;
                
                foreach (var ext in files
                    .Select(file => Encoding.Default.GetString(file))
                    .Where(ext => ext is ".mp4" or ".mov" or ".avi" or "quicktime"))
                {
                    await DeleteMovieFromGoogleStorage(exercises[i].Name + i + ext);
                }
            }

            _context.exercises.RemoveRange(exercises);
            _context.exercises.RemoveRange(exerciseInstances);

            var count = await _context.SaveChangesAsync();
            return count;
        }

        public async Task<ExerciseModel> TransformData(CreateExercise model)
        {
            var transformModel = new ExerciseModel();
            var filesList = new List<byte[]>();

            if (model.Files != null)
            {
                foreach (var (formFile, iterator) in model.Files.Select((c, i) => (c, i)))
                {
                    if (formFile.ContentType is "video/mp4" or "video/mov" or "video/avi" or "video/quicktime")
                    {
                        var ext = Path.GetExtension(formFile.FileName);
                        await using var memoryStream = new MemoryStream();
                        await formFile.CopyToAsync(memoryStream);
                        var fileNameWithExtensionAndNumber = model.Name+iterator+ext;

                        var path = await SaveMovieToDirectory(formFile, fileNameWithExtensionAndNumber);
                        await SaveMovieToGoogleStorage(fileNameWithExtensionAndNumber, path);
                        
                        filesList.Add(Encoding.ASCII.GetBytes(ext));
                    }
                    else
                    {
                        await using var memoryStream = new MemoryStream();
                        await formFile.CopyToAsync(memoryStream);
                        filesList.Add(memoryStream.ToArray());
                    }
                }
                
                // save movies to directory here outside loop
            }

            transformModel.Name = model.Name;
            transformModel.Description = model.Description;
            transformModel.Files = filesList.Any() 
                ? filesList
                : null;
            transformModel.CategoryId = model.CategoryId;

            return transformModel;
        }

        private async Task<string> SaveMovieToDirectory(IFormFile formFile, string name)
        {
            var path = Path.Combine(_environment.WebRootPath, "Movies");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            var fileName = Path.GetFileName(name);
            await using var stream = new FileStream(Path.Combine(path, fileName), FileMode.Create);
            await formFile.CopyToAsync(stream);
            return Path.Combine(path, fileName);
            
        }

        private async Task SaveMovieToGoogleStorage(string fileName, string path)
        {
            var gcsStorage = await StorageClient.CreateAsync();
            Stream stream = new FileStream(path, FileMode.Open);
            await gcsStorage.UploadObjectAsync(_bucketName, fileName, null, stream);
        }

        private async Task DeleteMovieFromGoogleStorage(string fileName)
        {
            var storage = await StorageClient.CreateAsync();
            await storage.DeleteObjectAsync(_bucketName, fileName);
        }

        public async Task<int> Update(Exercise updateExercise, string id)
        {
            var exercise = await _context.exercises.FindAsync(id);

            if(exercise == null)
                throw new AppException("Exercise not found!");

            if (updateExercise.Files != null)
            {
                if (exercise.Files != null)
                {
                    foreach (var file in updateExercise.Files)
                    {
                        exercise.Files.Add(file);
                    }
                }
                else
                {
                    exercise.Files = updateExercise.Files;
                }
            }

            if (!string.IsNullOrWhiteSpace(updateExercise.Name))
            {
                exercise.Name = updateExercise.Name;
            }

            if (!string.IsNullOrWhiteSpace(updateExercise.Description))
            {
                exercise.Description = updateExercise.Description;
            }
            
            if (updateExercise.Repeats != exercise.Repeats)
            {
                exercise.Repeats = updateExercise.Repeats;
            }

            if (updateExercise.Series != exercise.Series)
            {
                exercise.Series = updateExercise.Series;
            }

            if (updateExercise.Times != exercise.Times)
            {
                exercise.Times = updateExercise.Times;
            }

            if (updateExercise.Weight != exercise.Weight)
            {
                exercise.Weight = updateExercise.Weight;
            }

            _context.exercises.Update(exercise);
            await _context.SaveChangesAsync();

            return 1;
        }
    }
    
}


