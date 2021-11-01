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
using PlanfiApi.Data.Entities;
using PlanfiApi.Data.ViewModels;
using PlanfiApi.Helpers;
using PlanfiApi.Interfaces;
using PlanfiApi.Models;
using PlanfiApi.Models.ViewModels;

namespace PlanfiApi.Services.Exercises
{
    public class ExerciseService : IExerciseService
    {
        private readonly DataContext _context;
        private static IWebHostEnvironment _environment;
        private readonly string _bucketName = "planfi-movies";
        private readonly string _path = Path.Combine(_environment.WebRootPath, "Movies");
        
        
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


        public async Task<int> Delete(string[] id)
        {
            
            foreach (var exerciseId in id)
            {
                var exercise = await _context.exercises.FindAsync(exerciseId);
                if (exercise != null)
                {
                    _context.exercises.Remove(exercise);
                    
                    // remove all instances of exercise
                    var exerciseInstancesIds = _context.exercises
                        .Where(x => x.Name == exercise.Name && x.Description == exercise.Description);

                    //delete from bucket
                    if (exercise.Files != null && exercise.Files.Any())
                    {
                        for (var i = 0; i <= exercise.Files.Count; i++)
                        {
                            var ext = Encoding.Default.GetString(exercise.Files[i]);
                            await DeleteMovieFromGoogleStorage(_path, exercise.Name, ext);
                        }
                    }

                        
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
            var filesList = new List<byte[]>();

            if (model.Files != null)
            {
                foreach (var (formFile, iterator) in model.Files.Select((c, i) => (c, i)))
                {
                    if (formFile.ContentType is "video/mp4" or "video/mov" or "video/avi" or "video/quicktime")
                    {

                        var ext = Path.GetExtension(formFile.FileName);
                        await SaveMovieToDirectory(formFile, model.Name, iterator);
                        var bytes = Encoding.ASCII.GetBytes(ext);
                        await using var memoryStream = new MemoryStream();
                        await formFile.CopyToAsync(memoryStream);

                        filesList.Add(bytes);
                    }
                    else
                    {
                        await using var memoryStream = new MemoryStream();
                        await formFile.CopyToAsync(memoryStream);
                        filesList.Add(memoryStream.ToArray());
                    }
                }
            }

            transformModel.Name = model.Name;
            transformModel.Description = model.Description;
            transformModel.Files = filesList.Any() 
                ? filesList
                : null;
            transformModel.CategoryId = model.CategoryId;

            return transformModel;
        }

        private async Task SaveMovieToDirectory(IFormFile formFile,string name, int i)
        {
            //todo - is it needed to add the file to docker directory and from this to the google cloud storage? or there is nother posisiblity?
            if (!Directory.Exists(_path))
            {
                Directory.CreateDirectory(_path);
            }
            var fileName = Path.GetFileName(name+i);
            var ext = Path.GetExtension(formFile.FileName);
            await using var stream = new FileStream(Path.Combine(_path, fileName+ext), FileMode.Create);
            await formFile.CopyToAsync(stream);
            await SaveMovieToGoogleStorage(_path, fileName, ext);
        }

        private async Task SaveMovieToGoogleStorage(string path, string? fileName, string ext)
        {
            var filePath = Path.Combine(path, fileName + ext);
            var gcCredentialsPath = Path.Combine(Environment.CurrentDirectory, "gc_sa_key");
            
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", gcCredentialsPath);
            var gcsStorage = await StorageClient.CreateAsync();
            await using var f = File.OpenRead(filePath);
            var objectName = Path.GetFileName(filePath);
            gcsStorage.UploadObject(_bucketName, objectName, null, f);
        }
        
        private async Task DeleteMovieFromGoogleStorage(string path, string? fileName, string ext)
        {
            var filePath = Path.Combine(path, fileName + ext);
            var storage = StorageClient.Create();
            
            var objectName = Path.GetFileName(filePath);
            storage.DeleteObject(_bucketName, objectName);

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


