using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Data.Entities;
using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IPlanService
    {
        Task<Plan> GetById(string id);
        Task<Plan> Create(Plan plan);
        IEnumerable<Plan> GetAll();
        IEnumerable<Plan> GetOrganizationPlans(string id);
        Task<IEnumerable<Plan>> GetUserPlans(string id);
        IEnumerable<Plan> GetCreatorPlans(string id);
        Task<int> Delete(string[] id);
        Task<int> Update(string id, string title);
        void AssignExercisesToPlan(string planId, string[] exerciseId, ExerciseUpdateModel ExerciseModel);
        void UnassignExercisesToPlan(string planId, string[] exerciseId);
    }
}