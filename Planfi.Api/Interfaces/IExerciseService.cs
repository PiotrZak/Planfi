using System.Collections.Generic;
using System.Threading.Tasks;
using PlanfiApi.Data.Entities;
using PlanfiApi.Models.UpdateModels;
using WebApi.Models.ViewModels;

namespace PlanfiApi.Interfaces
{
    public interface IExerciseService
    {
        Task<Exercise> GetById(string id);
        Exercise Create(Exercise exercise);
        Exercise CreateInstance(Exercise exercise);
        IEnumerable<Exercise> GetAll();
        //todo - exclude model
        Task<IEnumerable<ExerciseViewModel>> GetAllByOrganization(string organizationId);
        IEnumerable<ExerciseViewModel> GetSerializedExercises();
        IEnumerable<ExerciseViewModel> GetSerializedExercisesInstances();
        IEnumerable<Exercise> GetAllOfCategory(string categoryId);
        IEnumerable<Exercise> GetAllOfPlan(string planId);
        Task<int> Update(UpdateExerciseModel exercise, string id);
        Task<int> Delete(string[] id);
    }
}