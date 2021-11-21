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
using PlanfiApi.Helpers;
using PlanfiApi.Interfaces;
using PlanfiApi.Models.SqlProjections;
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

        public async Task<ExerciseViewModel> GetById(string id)
        {
            var baseExercise = await GetBaseExercise(id);
            if (!IsGuid(baseExercise.Name)) return baseExercise;

            var basePlanExercise = await GetBaseExercise(baseExercise.Name);
            var planExerciseViewModel = await GetSerializedExercise(id, basePlanExercise);
            return planExerciseViewModel;

        }
        
        public static bool IsGuid(string value)
        {
            Guid x;
            return Guid.TryParse(value, out x);
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
	                e.description
	                FROM public.exercises as e
	                JOIN public.categories as c
	                ON e.category_id = c.category_id
	                WHERE NOT EXISTS (SELECT * FROM public.series as s 
	                WHERE e.exercise_id = s.exercise_id)
                ";
            
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
        
        public async Task<ExerciseViewModel> GetBaseExercise(string exerciseId)
        {
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();
            var exerciseBase = new ExerciseViewModel();
            
            try
            {
                const string baseExerciseQuery = @"SELECT
                    e.exercise_Id as ExerciseId,
                    e.name,
                    c.category_Id as CategoryId,
                    c.title as CategoryName,
                    e.description,
                    e.files
                    FROM public.exercises as e
                    JOIN public.categories as c
                    ON e.category_id = c.category_id
		            LEFT JOIN public.series as s
		            ON s.exercise_Id = e.exercise_Id
	                WHERE e.exercise_id = @exerciseId
                ";

                exerciseBase =
                    (await connection.QueryFirstOrDefaultAsync<ExerciseViewModel>(baseExerciseQuery, new { exerciseId }));
            }
            catch (Exception exp) {
                Console.Write(exp.Message);
            }
            finally
            {
                await connection.CloseAsync();
            }
            
            return exerciseBase;
        }
        
        public IEnumerable<Exercise> GetAll()
        {
            return _context.exercises;
        }



        private async Task<ExerciseViewModel> GetSerializedExercise(string exerciseId, ExerciseViewModel baseExercise)
        {
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();
            
            var exerciseInstance = new List<ExerciseSqlProjection>();
            try
            {
                const string exerciseInstancesQuery = @"SELECT
	                e.name,
	                e.exercise_id as ExerciseId,
	                e.category_id as CategoryId,
	                e.plan_id as PlanId,
                  e.files,
                  s.serie_id as SerieId,
	                s.weight,
	                s.times,
	                s.repeats
	                FROM public.exercises as e
	                JOIN public.series as s
	                ON s.exercise_Id = e.exercise_id
	                WHERE plan_id IS NOT NULL
	                AND e.exercise_Id = @exerciseId";
            
                exerciseInstance =  (await connection.QueryAsync<ExerciseSqlProjection>(exerciseInstancesQuery, new { exerciseId })).ToList();
            }
            catch (Exception exp) {
                Console.Write(exp.Message);
            }
            finally
            {
                await connection.CloseAsync();
            }
            
            
            var exercisesDuplicates = exerciseInstance
              .GroupBy(x => x.ExerciseId)
              .ToList();
            
            var seriesPerExercise = new Dictionary<string, List<Serie>>();
            
            foreach (var instance in exercisesDuplicates)
            {
              var serieList = instance.Select(x => 
                new Serie()
                {
                  SerieId = x.SerieId,
                  Repeats = x.Repeats,
                  Times = x.Times,
                  Weight = x.Weight,
                }).ToList();
              seriesPerExercise.Add(instance.Key, serieList);
            }
            
            var exerciseViewModel = new ExerciseViewModel()
            {
              ExerciseId = exerciseInstance[0].ExerciseId,
              Name = baseExercise.Name,
              Files = baseExercise.Files,
              CategoryId = exerciseInstance[0].CategoryId,
              CategoryName = baseExercise.CategoryName,
              PlanId = exerciseInstance[0].PlanId,
              Series = seriesPerExercise.FirstOrDefault(x => x.Key == exerciseInstance[0].ExerciseId).Value,
            };

            return exerciseViewModel;
        }
        

        public async Task<List<ExerciseViewModel>> GetSerializedExercisesInstances()
        {
            var baseExercises = await GetAllBaseExercises();

            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();
            
            var exercisesInstances = new List<ExerciseSqlProjection>();
            try
            {
                const string exerciseInstancesQuery = @"SELECT
	                e.name,
	                e.exercise_id as ExerciseId,
	                e.category_id as CategoryId,
	                e.plan_id as PlanId,
                    s.serie_id as SerieId,
	                s.weight,
	                s.times,
	                s.repeats
	                FROM public.exercises as e
	                JOIN public.series as s
	                ON s.exercise_Id = e.exercise_id
	                WHERE plan_id IS NOT NULL";
            
                exercisesInstances = (await connection.QueryAsync<ExerciseSqlProjection>(exerciseInstancesQuery)).ToList();
            }
            catch (Exception exp) {
                Console.Write(exp.Message);
            }
            finally
            {
                await connection.CloseAsync();
            }

            var exerciseViewModels = await ConstructSeriesExercise(exercisesInstances, baseExercises);
            return exerciseViewModels;
        }

        public async Task<List<ExerciseViewModel>> ConstructSeriesExercise(List<ExerciseSqlProjection> exercisesInstances, List<ExerciseViewModel> baseExercises)
        {
            var exercisesViewModels = new List<ExerciseViewModel>();
            var exercisesDuplicates = exercisesInstances
                .GroupBy(x => x.ExerciseId)
                .ToList();
            
            var seriesPerExercise = new Dictionary<string, List<Serie>>();
            
            foreach (var instance in exercisesDuplicates)
            {
                var serieList = instance.Select(x => 
                    new Serie()
                    {
                        SerieId = x.SerieId,
                        Repeats = x.Repeats,
                        Times = x.Times,
                        Weight = x.Weight,
                    }).ToList();
                seriesPerExercise.Add(instance.Key, serieList);
            }
            
            foreach(var exercise in exercisesDuplicates)
            {
                var exerciseList = exercise.ToList();
                
                var exerciseBaseOfThisExercise = baseExercises
                    .SingleOrDefault(x => x.ExerciseId == exerciseList[0].Name);

                if (exerciseBaseOfThisExercise == null) continue;

                var exerciseViewModel = new ExerciseViewModel()
                {
                    ExerciseId = exerciseList[0].ExerciseId,
                    Name = exerciseBaseOfThisExercise.Name,
                    Files = exerciseBaseOfThisExercise.Files,
                    CategoryId = exerciseList[0].CategoryId,
                    CategoryName = exerciseBaseOfThisExercise.CategoryName,
                    PlanId = exerciseList[0].PlanId,
                    Series = seriesPerExercise
                        .FirstOrDefault(x => x.Key == exerciseList[0].ExerciseId).Value,
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
                    //todo!
                    //await _fileService.DeleteMovieFromGoogleStorage(exercises[i].Name + 1 + ext);
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
            
            if (updateExercise.Series != exercise.Series)
            {
                exercise.Series = updateExercise.Series;
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


