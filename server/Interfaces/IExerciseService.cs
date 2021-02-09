using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Entities;
using WebApi.Services;

namespace WebApi.Interfaces
{
    public interface IExerciseService
    {
        Exercise GetById(string id);
        Exercise Create(Exercise Exercise);
        Exercise CreateInstance(Exercise Exercise);
        IEnumerable<Exercise> GetAll();
        //todo - exclude model
        Task<IEnumerable<ExerciseService.ExerciseViewModel>> GetAllByOrganization(string organizationId);
        IEnumerable<ExerciseService.ExerciseViewModel> GetSerializedExercises();
        IEnumerable<ExerciseService.ExerciseViewModel> GetSerializedExercisesInstances();
        IEnumerable<Exercise> GetAllOfCategory(string categoryId);
        IEnumerable<Exercise> GetAllOfPlan(string planId);
        Task<int> Update(Exercise exercise, string id);
        Task<int> Delete(string[] id);
    }
}