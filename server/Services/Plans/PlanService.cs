using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Services
{
    public class PlanService : IPlanService
    {
        private readonly DataContext _context;
        private readonly IExerciseService _exerciseService;
        
        public PlanService(DataContext context, IExerciseService exerciseService)
        {
            _context = context;
            _exerciseService = exerciseService;
        }

        public Plan Create(Plan plan)
        {
            // throw error if the new plan is already taken
            if (_context.Plans.Any(x => x.Title == plan.Title))
                throw new AppException("Plan " + plan.Title + " is already exist");

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

        public void Update(string id, string title)
        {
            var plan = _context.Plans.Find(id);

            if (plan == null)
                throw new AppException("Plan not found");

            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(title))
                plan.Title = title;

            _context.Plans.Update(plan);
            _context.SaveChanges();
        }


        public void Delete(string[] id)
        {
            foreach(var planId in id)
            {
                var exercisesInPlan = _context.Exercises.Where(x => x.PlanId == planId);

                foreach(var exerciseItem in exercisesInPlan)
                {
                    exerciseItem.PlanId = null;
                }

                var plan = _context.Plans.Find(planId);
                if (plan != null)
                {
                    _context.Plans.Remove(plan);
                    _context.SaveChanges();
                }
            }
        }

        public void AssignExercisesToPlan(string planId, string[] exerciseId, ExerciseUpdateModel exerciseModel)
        {
            var plan = GetById(planId);

            foreach (var id in exerciseId)
            {
                var element = _context.Exercises.Find(id);
                
                element.ExerciseId = Guid.NewGuid().ToString();
                element.Times = exerciseModel.Times;
                element.Weight = exerciseModel.Weight;
                element.Series = exerciseModel.Series;
                element.Repeats = exerciseModel.Repeats;
                
                //creating exercise instance
                _exerciseService.CreateInstance(element);
                
                //assigning exercise to plan
                plan.Exercises.Add(element);
            }
            _context.Plans.Update(plan);
            _context.SaveChanges();
        }

        public void UnassignExercisesToPlan(string planId, string[] exerciseId)
        {
            var plan = GetById(planId);

            foreach (var id in exerciseId)
            {
                var element = _context.Exercises.Find(id);
                plan.Exercises.Remove(element);
            }
            _context.Plans.Update(plan);
            _context.SaveChanges();
        }

        public IEnumerable<Plan> GetOrganizationPlans(string organizationId)
        {
            var organizationPlans = _context.Plans.Where(x => x.OrganizationId == organizationId);
            return organizationPlans;

        }

        public IEnumerable<Plan> GetUserPlans(string userId)
        {
            var userPlans = _context.ClientsPlans.Where(x => x.ClientId == userId);

            var planIds = new List<string>();
            var plans = new List<Plan>();

            foreach (var i in userPlans)
            {
                var planId = i.PlanId;
                planIds.Add(planId);
            }

            for (int i = 0; i < planIds.Count; i++)
            {
                var plan = _context.Plans.FirstOrDefault(x => x.PlanId == planIds[i]);
                plans.Add(plan);
            }

            return plans;

        }

        public IEnumerable<Plan> GetCreatorPlans(string id)
        {
            var plans = _context.Plans.Where(x => x.CreatorId == id);
            return plans;
        }
    }
}


