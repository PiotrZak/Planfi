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

namespace WebApi.Services.exercises
{
    public class ExerciseService : IExerciseService
    {
        private readonly DataContext _context;
        private readonly IHostingEnvironment _environment;

        public ExerciseService(DataContext context, IHostingEnvironment environment)
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


        public async Task<int> Delete(string[] id)
        {
            
            foreach (var exerciseId in id)
            {
                var exercise = await _context.exercises.FindAsync(exerciseId);
                if (exercise != null)
                {
                    _context.exercises.Remove(exercise);
                    var exerciseInstancesIds = _context.exercises
                        .Where(x => x.Name == exercise.Name && x.Description == exercise.Description);

                    foreach(var exerciseInstanceId in exerciseInstancesIds)
                    {
                        _context.exercises.Remove(exerciseInstanceId);
                    }
                }
            }
            var count = await _context.SaveChangesAsync();
            return count;
        }

        public async Task<ExerciseModel> TransformData(CreateExercise model)
        {
            var transformModel = new ExerciseModel();
            if (model.Files != null)
            {
                var i = 0;
                var filesList = new List<byte[]>();
                foreach (var formFile in model.Files.Where(formFile => formFile.Length > 0))
                {
                    if (formFile.ContentType is "video/mp4" or "video/mov" or "video/avi" or "video/quicktime")
                    {
                        
                        //TODO - save that file not to CurrentDirectory but to frontend directory
                        _environment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

                        //SaveMovieToGoogleStorage();
                        SaveMovieToDirectory(formFile, model.Name, i);
                        
                        // var bytes = Encoding.ASCII.GetBytes(ext);
                        // await using var memoryStream = new MemoryStream();
                        // await formFile.CopyToAsync(memoryStream);
                        // filesList.Add(bytes);
                    }
                    else
                    {
                        await using var memoryStream = new MemoryStream();
                        await formFile.CopyToAsync(memoryStream);
                        filesList.Add(memoryStream.ToArray());
                    }
                    i++;
                }
                transformModel.Name = model.Name;
                transformModel.Description = model.Description;
                transformModel.Files = filesList;
                transformModel.CategoryId = model.CategoryId;
            }
            else
            {
                transformModel.Name = model.Name;
                transformModel.Description = model.Description;
                transformModel.Files = null;
                transformModel.CategoryId = model.CategoryId;
            }

            return transformModel;
        }

        private async Task SaveMovieToDirectory(IFormFile formFile,string name, int i)
        {
            var path = Path.Combine(_environment.WebRootPath, "Movies");
            
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            var fileName = Path.GetFileName(name+i);
            var ext = Path.GetExtension(formFile.FileName);
            await using (var stream = new FileStream(Path.Combine(path, fileName+ext), FileMode.Create))
            {
                await formFile.CopyToAsync(stream);
                SaveMovieToGoogleStorage(path, fileName, ext);
            }
        }

        private void SaveMovieToGoogleStorage(string path, string? fileName, string ext)
        {
            const string bucketName = "planfi-movies";
            var filePath = Path.Combine(path, fileName + ext);
            var gcCredentialsPath = Path.Combine(Environment.CurrentDirectory, "gc_sa_key");
            
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", gcCredentialsPath);
            var gcsStorage = StorageClient.Create();
            using var f = File.OpenRead(filePath);
            var objectName = Path.GetFileName(filePath);
            gcsStorage.UploadObject(bucketName, objectName, null, f);
            Console.WriteLine($"Uploaded {objectName}.");
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


