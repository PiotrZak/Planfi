using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IExerciseService
    {
        Exercise GetById(string id);
        Exercise Create(Exercise Exercise);
        IEnumerable<Exercise> GetAll();
        IEnumerable<Exercise> GetAllOfCategory(string categoryId);
        IEnumerable<Exercise> GetAllOfPlan(string planId);
        void Delete(string id);
    }

    public class ExerciseService : IExerciseService
    {
        private DataContext _context;

        public ExerciseService(DataContext context)
        {
            _context = context;
        }

        public Exercise Create(Exercise exercise)
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


        public void Delete(string id)
        {
            var exercise = _context.Exercises.Find(id);
            if(exercise != null)
            {
                _context.Exercises.Remove(exercise);
                _context.SaveChanges();
            }
        }

    }
}


