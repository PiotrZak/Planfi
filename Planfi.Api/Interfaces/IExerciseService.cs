using System.Collections.Generic;
using System.Threading.Tasks;
using PlanfiApi.Data.Entities;
using PlanfiApi.Models.UpdateModels;
using PlanfiApi.Models.ViewModels;

namespace PlanfiApi.Interfaces
{
    //todo - rethink bussiness value
    
    public interface IExerciseService
    {
        Task<ExerciseViewModel> GetById(string id);
        Exercise Create(Exercise exercise);
        Exercise CreateInstance(Exercise exercise);
        IEnumerable<Exercise> GetAll();
        
        // Task<IEnumerable<ExerciseViewModel>> GetAllByOrganization(string organizationId);
        Task<List<ExerciseViewModel>> GetSerializedExercisesInstances();
        IEnumerable<Exercise> GetAllOfCategory(string categoryId);
        IEnumerable<Exercise> GetAllOfPlan(string planId);
        Task<int> Update(UpdateExerciseModel exercise, string id);
        Task<int> Delete(string[] id);
        Task<List<ExerciseViewModel>> GetAllBaseExercises();
    }
}