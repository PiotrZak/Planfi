using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IPlanService
    {
        Plan GetById(string id);
        Plan Create(Plan plan);
        IEnumerable<Plan> GetAll();
        void Delete(string id);
        void AssignExercisesToPlan(string planId, string[] exerciseId);
    }

    public class PlanService : IPlanService
    {
        private DataContext _context;

        public PlanService(DataContext context)
        {
            _context = context;
        }

        public Plan Create(Plan plan)
        {
           
            _context.Plans.Add(plan);
            _context.SaveChanges();

            return plan;
        }

        public Plan GetById(string id)
        {

            var plan = _context.Plans.FirstOrDefault(x => x.PlanId == id);
            return plan;
        }
        public IEnumerable<Plan> GetAll()
        {

            return _context.Plans;
        }
        public void Delete(string id)
        {
            var plan = _context.Plans.Find(id);
            if (plan != null)
            {
                _context.Plans.Remove(plan);
                _context.SaveChanges();
            }
        }

        public void AssignExercisesToPlan(string planId, string[] exerciseId)
        {
            var plan = GetById(planId);

            foreach (var id in exerciseId)
            {
                var element = _context.Exercises.Find(id);
                plan.Exercises.Add(element);
            }
            _context.Plans.Update(plan);
            _context.SaveChanges();
        }
    }
}


