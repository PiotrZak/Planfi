using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Data.Entities;
using WebApi.Models;
using WebApi.Models.ViewModels;

namespace WebApi.Interfaces
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
        Task<int> Update(Exercise exercise, string id);
        Task<int> Delete(string[] id);
        Task<ExerciseModel> TransformData(CreateExercise model);
    }
}