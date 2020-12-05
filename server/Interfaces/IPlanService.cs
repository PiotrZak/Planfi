using System.Collections.Generic;
using WebApi.Entities;

namespace WebApi.Interfaces
{
    public interface IPlanService
    {
        Plan GetById(string id);
        Plan Create(Plan plan);
        IEnumerable<Plan> GetAll();
        IEnumerable<Plan> GetOrganizationPlans(string id);
        IEnumerable<Plan> GetUserPlans(string id);
        IEnumerable<Plan> GetCreatorPlans(string id);
        void Delete(string[] id);
        void AssignExercisesToPlan(string planId, string[] exerciseId);
        void UnassignExercisesToPlan(string planId, string[] exerciseId);
        void Update(string id, string title);
    }
}