using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
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

        public async Task<Plan> Create(Plan plan)
        {
            //check for duplication in orgaanization context
            var duplication = _context.Plans
                .Where(x => x.OrganizationId == plan.OrganizationId)
                .Any(x => x.Title == plan.Title);
            
            if (duplication)
                throw new AppException("Category " + plan.Title + " is already exist");
            
            await _context.Plans.AddAsync(plan);
            await _context.SaveChangesAsync();

            return plan;
        }

        public async Task<Plan> GetById(string id)
        {
            var plan = await _context.Plans
                .FirstOrDefaultAsync(x => x.PlanId == id);
            return plan;
        }
        public IEnumerable<Plan> GetAll()
        {

            return _context.Plans;
        }

        public async Task<int> Update(string id, string title)
        {
            var plan = await _context.Plans.FindAsync(id);

            if (plan == null)
                throw new AppException("Plan not found");

            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(title))
                plan.Title = title;

            _context.Plans.Update(plan);
            return await _context.SaveChangesAsync();
        }
        
        public async Task<int> Delete(string[] id)
        {
            try
            {
                foreach (var planId in id)
                {
                    var exercisesInPlan = _context.Exercises.Where(x => x.PlanId == planId);

                    foreach (var exerciseItem in exercisesInPlan)
                    {
                        exerciseItem.PlanId = null;
                    }

                    var plan = await _context.Plans.FindAsync(planId);
                    if (plan != null)
                    {
                        _context.Plans.Remove(plan);
                        await _context.SaveChangesAsync();
                    }
                }
            }
            catch (ValidationException)
            {
                return 0;
            }
            return 1;
        }

        public void AssignExercisesToPlan(string planId, string[] exerciseId, ExerciseUpdateModel exerciseModel)
        {
            var plan = GetById(planId).Result;

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
            var plan = GetById(planId).Result;

            foreach (var id in exerciseId)
            {
                var element = _context.Exercises.Find(id);
                element.PlanId = null;
                _context.Exercises.Update(element);
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

            foreach (var i in userPlans)
            {
                var planId = i.PlanId;
                planIds.Add(planId);
            }

            return planIds.Select((t, i) => _context.Plans.FirstOrDefault(x => x.PlanId == planIds[i])).ToList();
        }

        public IEnumerable<Plan> GetCreatorPlans(string id)
        {
            var plans = _context.Plans.Where(x => x.CreatorId == id);
            return plans;
        }
    }
}


