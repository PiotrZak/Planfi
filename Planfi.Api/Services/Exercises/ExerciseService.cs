using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql;
using PlanfiApi.Data.Entities;
using PlanfiApi.Interfaces;
using PlanfiApi.Models.UpdateModels;
using PlanfiApi.Models.ViewModels;
using PlanfiApi.Services.Files;
using WebApi.Helpers;

namespace PlanfiApi.Services.Exercises
{
    public class ExerciseService : IExerciseService
    {
        private readonly DataContext _context;
        private readonly IFileService _fileService;
        private IConfiguration Configuration { get; }

        public ExerciseService(DataContext context, IFileService fileService, IConfiguration configuration)
        {
            _context = context;
            _fileService = fileService;
            Configuration = configuration;
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

        public async Task<List<ExerciseViewModel>> GetAllBaseExercises()
        {
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();
            var exercisesBase = new List<ExerciseViewModel>();
            
            try
            {
                const string baseExerciseQuery = @"SELECT
                    e.exercise_Id as ExerciseId,
                    e.name,
                    c.title as CategoryName,
                    c.category_id as CategoryId,
                    e.description,
                    e.files
                    FROM public.exercises as e
                    JOIN public.categories as c
                    ON e.category_id = c.category_id
                    WHERE e.series = 0 AND repeats = 0 AND weight = 0 and times = 0";
            
                exercisesBase = (await connection.QueryAsync<ExerciseViewModel>(baseExerciseQuery)).ToList();
            }
            catch (Exception exp) {
                Console.Write(exp.Message);
            }
            finally
            {
                await connection.CloseAsync();
            }
            
            return exercisesBase;
        }
        
        public async Task<List<ExerciseViewModel>> GetBaseExercise()
        {
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();
            var exercisesBase = new List<ExerciseViewModel>();
            
            try
            {
                const string baseExerciseQuery = @"SELECT
                    e.exercise_Id as ExerciseId,
                    e.name,
                    c.title as CategoryName,
                    e.description,
                    e.files
                    FROM public.exercises as e
                    JOIN public.categories as c
                    ON e.category_id = c.category_id
                    WHERE e.series = 0 AND repeats = 0 AND weight = 0 and times = 0";
            
                exercisesBase = (await connection.QueryAsync<ExerciseViewModel>(baseExerciseQuery)).ToList();
            }
            catch (Exception exp) {
                Console.Write(exp.Message);
            }
            finally
            {
                await connection.CloseAsync();
            }
            
            return exercisesBase;
        }
        
        public Task<Exercise> GetById(string id)
        {
            return _context.exercises.FirstOrDefaultAsync(x => x.ExerciseId == id);
        }

        public IEnumerable<Exercise> GetAll()
        {
            return _context.exercises;
        }
        

        public async Task<List<ExerciseViewModel>> GetSerializedExercisesInstances()
        {
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();

            var baseExercises = await GetBaseExercise();
            
            var exercisesInstances = new List<ExerciseViewModel>();
            try
            {
                const string exerciseInstancesQuery = @"SELECT
                    e.name,
                    e.exercise_id as ExerciseId,
                    e.category_id as CategoryId,
                    e.plan_id as PlanId,
                    e.series,
                    e.repeats,
                    e.weight,
                    e.times
                    FROM public.exercises as e
                    JOIN (SELECT name, COUNT(*)
		                    FROM public.exercises
		                    GROUP BY name
		                    HAVING count(*) > 1 ) as b
		                    ON e.name = b.name
                    WHERE plan_id IS NOT NULL";
            
                exercisesInstances = (await connection.QueryAsync<ExerciseViewModel>(exerciseInstancesQuery)).ToList();
            }
            catch (Exception exp) {
                Console.Write(exp.Message);
            }
            finally
            {
                await connection.CloseAsync();
            }


            var exercisesViewModels = new List<ExerciseViewModel>();
            
            foreach(var exercise in exercisesInstances)
            {
                var exerciseBaseOfThisExercise = baseExercises
                    .SingleOrDefault(x => x.ExerciseId == exercise.Name);

                var exerciseViewModel = new ExerciseViewModel()
                {
                    ExerciseId = exercise.ExerciseId,
                    Name = exerciseBaseOfThisExercise.Name,
                    Files = exerciseBaseOfThisExercise.Files,
                    CategoryId = exercise.CategoryId,
                    CategoryName = exerciseBaseOfThisExercise.CategoryName,
                    PlanId = exercise.PlanId,
                    Series = exercise.Series,
                    Repeats = exercise.Repeats,
                    Times = exercise.Times,
                    Weight = exercise.Weight,
                };
                    
                exercisesViewModels.Add(exerciseViewModel);
            }
            
            
            return exercisesViewModels;
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
                    await _fileService.DeleteMovieFromGoogleStorage(exercises[i].Name + 1 + ext);
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
                files = files != null 
                    ? files.Concat(addedFiles).ToList() 
                    : addedFiles;
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
    
    // public async Task<IEnumerable<ExerciseViewModel>> GetAllByOrganization(string organizationId)
    // {
    //     var organizationCategories = await _context.categories
    //         .Where(x => x.OrganizationId == organizationId)
    //         .ToListAsync();
    //     
    //     var organizationexercises = new List<ExerciseViewModel>();
    //     
    //     foreach(var organizationCategory in organizationCategories)
    //     {
    //         var categoryexercises = await _context.exercises
    //             .Where(x => x.CategoryId == organizationCategory.CategoryId)
    //             .ToListAsync();
    //
    //         organizationexercises
    //             .AddRange(categoryexercises
    //             .Select(exercise => new ExerciseViewModel
    //         {
    //             ExerciseId = exercise.ExerciseId,
    //             Name = exercise.Name,
    //             Files = exercise.Files != null && exercise.Files.Any()
    //                 ? exercise.Files[0]
    //                 : null,
    //             CategoryId = exercise.CategoryId,
    //             PlanId = exercise.PlanId
    //         }));
    //     }
    //     return organizationexercises;
    // }
    
}


