using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Interfaces;

namespace WebApi.Services
{
    public class ExerciseService : IExerciseService
    {
        private DataContext _context;

        public ExerciseService(DataContext context)
        {
            _context = context;
        }

        public Exercise Create(Exercise exercise)
        {
            // throw error if the new plan is already taken
            if (_context.Exercises.Any(x => x.Name == exercise.Name))
                throw new AppException("Exercise " + exercise.Name + " is already exist");

            _context.Exercises.Add(exercise);
            _context.SaveChanges();

            return exercise;
        }
        public Exercise CreateInstance(Exercise exercise)
        {
            _context.Exercises.Add(exercise);
            _context.SaveChanges();

            return exercise;
        }
        
        public Exercise GetById(string id)
        {

            var exercise = _context.Exercises.FirstOrDefault(x => x.ExerciseId == id);
            return exercise;
        }

        public IEnumerable<Exercise> GetAll()
        {
            return _context.Exercises;
        }

        public IEnumerable<ExerciseViewModel> GetSerializedCategoryExercise()
        {
            var allExercises = _context.Exercises;
            var transformedExercises = new List<ExerciseViewModel>();
            
            foreach (var exercise in allExercises)
            {
                var modelExercise = new ExerciseViewModel();
                    
                if (exercise.Files != null && exercise.Files.Any())
                {
                    modelExercise.ExerciseId = exercise.ExerciseId;
                    modelExercise.Name = exercise.Name;
                    modelExercise.File = Convert.ToBase64String(exercise.Files?[0]);
                    modelExercise.CategoryId = exercise.CategoryId;
                }
                else
                {
                    modelExercise.ExerciseId = exercise.ExerciseId;
                    modelExercise.Name = exercise.Name;
                    modelExercise.File = null;
                    modelExercise.CategoryId = exercise.CategoryId;
                }
                
                transformedExercises.Add(modelExercise);
            }

            return transformedExercises;
        }
        
        public class ExerciseViewModel
        {
            public ExerciseViewModel()
            {
                File = new string("");
            }
            public string ExerciseId { get; set; }
            public string Name { get; set; }
            public string? File { get; set; }
            public string CategoryId { get; set; }
        }

        public IEnumerable<Exercise> GetAllOfCategory(string categoryId)
        {
            var Exercises = _context.Exercises.Where(x => x.CategoryId == categoryId);
            return Exercises;
        }

        public IEnumerable<Exercise> GetAllOfPlan(string planId)
        {
            var Exercises = _context.Exercises.Where(x => x.PlanId == planId);
            return Exercises;
        }


        public async Task<int>  Delete(string id)
        {
            var exercise = _context.Exercises.Find(id);
            if(exercise != null)
            {
                _context.Exercises.Remove(exercise);
                await _context.SaveChangesAsync();
            }

            return 1;
        }

        public async Task<int> Update(Exercise updateExercise, string id)
        {
            var exercise = _context.Exercises.Find(id);

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

            _context.Exercises.Update(exercise);
            await _context.SaveChangesAsync();

            return 1;
        }
    }
    
}


