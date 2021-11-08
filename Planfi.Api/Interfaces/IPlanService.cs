using System.Collections.Generic;
using System.Threading.Tasks;
using PlanfiApi.Data.Entities;
using WebApi.Models;

namespace PlanfiApi.Interfaces
{
    public interface IPlanService
    {
        Task<List<ResultPlan>> GetUserPlans();
        Task<List<Plan>> GetByIds(List<string> ids);
        Task<Plan> GetById(string id);
        Task<Plan> Create(Plan plan);
        Task<List<Plan>> GetAll();
        IEnumerable<Plan> GetOrganizationPlans(string id);
        Task<int> Delete(string[] id);
        Task<int> Update(string id, string title);
        Task AssignExercisesToPlan(string planId, string[] exerciseId, ExerciseUpdateModel ExerciseModel);
        Task UnassignExercisesToPlan(string planId, string[] exerciseId);
    }
}