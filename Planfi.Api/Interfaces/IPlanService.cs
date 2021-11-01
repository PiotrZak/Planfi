using System.Collections.Generic;
using System.Threading.Tasks;
using PlanfiApi.Data.Entities;
using PlanfiApi.Models;

namespace PlanfiApi.Interfaces
{
    public interface IPlanService
    {

        Task<List<ResultPlan>> GetUserPlans(string userId);
        Task<List<Plan>> GetByIds(List<string> ids);
        Task<Plan> GetById(string id);
        Task<Plan> Create(Plan plan);
        IEnumerable<Plan> GetAll();
        IEnumerable<Plan> GetOrganizationPlans(string id);
        IEnumerable<Plan> GetCreatorPlans(string id);
        Task<int> Delete(string[] id);
        Task<int> Update(string id, string title);
        void AssignExercisesToPlan(string planId, string[] exerciseId, ExerciseUpdateModel ExerciseModel);
        void UnassignExercisesToPlan(string planId, string[] exerciseId);
    }
}