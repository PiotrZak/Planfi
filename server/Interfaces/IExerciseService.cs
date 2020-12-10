using System.Collections.Generic;
using WebApi.Entities;

namespace WebApi.Interfaces
{
    public interface IExerciseService
    {
        Exercise GetById(string id);
        Exercise Create(Exercise Exercise);
        IEnumerable<Exercise> GetAll();
        IEnumerable<Exercise> GetAllOfCategory(string categoryId);
        IEnumerable<Exercise> GetAllOfPlan(string planId);
        void Update(Exercise exercise, string id);
        void Delete(string id);
    }
}