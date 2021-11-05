using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql;
using PlanfiApi.Interfaces;
using WebApi.Data.Entities;
using WebApi.Helpers;
using WebApi.Models;

namespace PlanfiApi.Services.Plans
{
    public class PlanService : IPlanService
    {
        private readonly DataContext _context;
        private IConfiguration Configuration { get; }
        private readonly IExerciseService _exerciseService;
        
        public PlanService(DataContext context, IExerciseService exerciseService, IConfiguration configuration)
        {
            Configuration = configuration;
            _context = context;
            _exerciseService = exerciseService;
        }

        public async Task<Plan> Create(Plan plan)
        {
            //check for duplication in orgaanization context
            var duplication = _context.plans
                .Where(x => x.OrganizationId == plan.OrganizationId)
                .Any(x => x.Title == plan.Title);
            
            if (duplication)
                throw new AppException("Plan " + plan.Title + " is already exist in this organization");
            
            await _context.plans.AddAsync(plan);
            await _context.SaveChangesAsync();

            return plan;
        }

        public async Task<Plan> GetById(string id)
        {
            var plan = await _context.plans
                .FirstOrDefaultAsync(x => x.PlanId == id);
            
            return plan;
        }

        public async Task<List<Plan>> GetByIds(List<string> ids)
        {
            var plans = await _context.plans
                .Where(x => ids.Contains(x.PlanId))
                .ToListAsync();

            return plans;
        }

        public async Task<List<Plan>> GetAll()
        {
            var plans = await _context.plans.ToListAsync();
            return plans;
        }

        public async Task<int> Update(string id, string title)
        {
            var plan = await _context.plans.FindAsync(id);

            if (plan == null)
                throw new AppException("Plan not found");

            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(title))
                plan.Title = title;

            _context.plans.Update(plan);
            return await _context.SaveChangesAsync();
        }
        
        public async Task<int> Delete(string[] id)
        {
            try
            {
                foreach (var planId in id)
                {
                    var exercisesInPlan = _context.exercises.Where(x => x.PlanId == planId);

                    foreach (var exerciseItem in exercisesInPlan)
                    {
                        exerciseItem.PlanId = null;
                    }

                    var plan = await _context.plans.FindAsync(planId);
                    if (plan != null)
                    {
                        _context.plans.Remove(plan);
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

        public async Task AssignExercisesToPlan(string planId, string[] exerciseId, ExerciseUpdateModel exerciseModel)
        {
            var plan = GetById(planId).Result;

            foreach (var id in exerciseId)
            {
                var element = await _context.exercises.FindAsync(id);
                
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
            _context.plans.Update(plan);
            await _context.SaveChangesAsync();
        }

        public void UnassignExercisesToPlan(string planId, string[] exerciseId)
        {
            var plan = GetById(planId).Result;

            foreach (var id in exerciseId)
            {
                var element = _context.exercises.Find(id);
                element.PlanId = null;
                _context.exercises.Update(element);
                plan.Exercises.Remove(element);
            }
            _context.plans.Update(plan);
            _context.SaveChanges();
        }

        public IEnumerable<Plan> GetOrganizationPlans(string organizationId)
        {
            var organizationPlans = _context.plans.Where(x => x.OrganizationId == organizationId);
            return organizationPlans;

        }

        public async Task<List<ResultPlan>> GetUserPlans(string userId)
        {
            
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();

            var userPlans = new List<ResultPlan>();
            try
            {
                const string userPlansQuery = @"SELECT 
                    p.plan_id,
                    p.title,
                    p.creator_id,
                    p.creator_name
                    FROM public.users as u
                    JOIN public.usersplans as up
                    ON u.user_id = up.user_id
                    JOIN public.plans as p
                    ON p.plan_id = up.plan_id
                    WHERE u.user_id = @userId";

                userPlans = (await connection.QueryAsync<ResultPlan>(userPlansQuery, new {userId})).ToList();
            }
            catch (Exception exp) {
                Console.Write(exp.Message);
            }
            finally
            {
                await connection.CloseAsync();
            }
            
            return userPlans;
        }

        public IEnumerable<Plan> GetCreatorPlans(string id)
        {
            var plans = _context.plans.Where(x => x.CreatorId == id);
            return plans;
        }
    }
}


