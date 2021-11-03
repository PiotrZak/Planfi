using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using PlanfiApi.Data.Entities;
using PlanfiApi.Data.ViewModels;
using PlanfiApi.Interfaces;
using PlanfiApi.Models.UpdateModels;
using PlanfiApi.Services.Files;
using WebApi.Helpers;
using WebApi.Models.ViewModels;

namespace PlanfiApi.Services.Exercises
{
    public class ExerciseService : IExerciseService
    {
        private readonly DataContext _context;
        private readonly IFileService _fileService;

        public ExerciseService(DataContext context, IFileService fileService)
        {
            _context = context;
            _fileService = fileService;
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
            
            for (var i = 0; i < exercises.Count; i++)
            {
                var files = exercises[i].Files;
                if (files == null) continue;
                
                foreach (var ext in files
                    .Select(file => Encoding.Default.GetString(file))
                    .Where(ext => ext is ".mp4" or ".mov" or ".avi" or "quicktime"))
                {
                    await _fileService.DeleteMovieFromGoogleStorage(exercises[i].Name + i + ext);
                }
            }

            _context.exercises.RemoveRange(exercises);

            var count = await _context.SaveChangesAsync();
            return count;
        }
        
        public async Task<int> Update(UpdateExerciseModel updateExercise, string id)
        {
            var exercise = await _context.exercises.FindAsync(id);
            
            if (exercise == null)
                throw new AppException("Exercise not found!");

            var files = exercise.Files;

            if (files != null)
            {
                if (updateExercise.FilesToDelete != null && updateExercise.FilesToDelete.Any())
                {
                    await _fileService.DeleteFilesFromExercise(exercise.Name, updateExercise.FilesToDelete,exercise.Files);

                    foreach (var fileToRemove in updateExercise.FilesToDelete
                        .Select(file => files
                        .Find(x => x.Length == file.Length)))
                    {
                        files.Remove(fileToRemove);
                    }
                }
            }
            
            if (updateExercise.Files != null && updateExercise.Files.Any())
            {
                var addedFiles = await _fileService.ProcessFileExercise(updateExercise.Files, updateExercise.Name);

                if (files != null)
                {
                    files = files.Concat(addedFiles).ToList();
                }
                else
                {
                    files = addedFiles;
                }

            }

            exercise.Files = files;
            
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


