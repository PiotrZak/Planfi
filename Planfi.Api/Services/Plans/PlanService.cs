using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql;
using PlanfiApi.Data.Entities;
using PlanfiApi.Helpers;
using PlanfiApi.Interfaces;
using PlanfiApi.Models.ViewModels;
using WebApi.Helpers;

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

            if (plan == null)
            {
                throw new Exception("No plan found");
            }
            
            return plan;
        }

        public async Task<List<Plan>> GetByIds(string[] ids)
        {
            var plans = await _context.plans
                .Where(x => ids.Contains(x.PlanId))
                .ToListAsync();

            return plans;
        }

        public async Task<List<Plan>> GetAll()
        {
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();

            var plans = new List<Plan>();
            try
            {
                const string plansQuery = @"SELECT 
                    p.plan_id as PlanId,
                    p.title,
                    p.creator_id as CreatorId,
                    p.organization_id as OrganizationId,
                    CONCAT(u.first_name, ' ', u.last_name) as CreatorName
                    FROM public.plans as p
                    JOIN public.users as u
                    ON u.user_id = p.creator_id";

                plans = (await connection.QueryAsync<Plan>(plansQuery)).ToList();
            }
            catch (Exception exp) {
                Console.Write(exp.Message);
            }
            finally
            {
                await connection.CloseAsync();
            }
            
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
        
        public async Task<int> Delete(string[] ids)
        {
            var exercises = await _context.exercises
                .Where(x => ids.Contains(x.PlanId))
                .OrderBy(x => x.PlanId)
                .ToListAsync();
            
            var series = await _context.series
              .Where(x => exercises.Select(x => x.ExerciseId).ToList().Contains(x.ExerciseId))
              .OrderBy(x => x.ExerciseId)
              .ToListAsync();
            
            var plans = await _context.plans
                .Where(x => ids.Contains(x.PlanId))
                .OrderBy(x => x.PlanId)
                .ToListAsync();

            _context.series.RemoveRange(series);
            _context.exercises.RemoveRange(exercises);
            _context.plans.RemoveRange(plans);
            
            await _context.SaveChangesAsync();

            return 1;
        }

        public async Task AssignExercisesToPlan(string planId, string[] exerciseId, List<Serie> series)
        {
            var plan = await GetById(planId);
            
            // there is only one exercise per every plan -> but if there is option for multiple assign
            // then change SingleOrDefault into Where 
            
            var exercise = await _context.exercises
                .SingleOrDefaultAsync(x => exerciseId.Contains(x.ExerciseId));

            if (exercise != null)
            {
                exercise.ExerciseId = Guid.NewGuid().ToString();
                exercise.Name = exerciseId[0];
                exercise.Series = series;
            }

            _exerciseService.CreateInstance(exercise);
            plan.Exercises.Add(exercise);
            _context.plans.Update(plan);
            await _context.SaveChangesAsync();
        }

        public async Task UnassignExercisesToPlan(string planId, string[] exerciseId)
        {
            var plan = GetById(planId).Result;

            foreach (var id in exerciseId)
            {
                var element = await _context.exercises.FindAsync(id);
                if (element == null) continue;
                
                element.PlanId = null;
                _context.exercises.Update(element);
                plan.Exercises.Remove(element);
            }
            _context.plans.Update(plan);
            await _context.SaveChangesAsync();
        }

        public IEnumerable<Plan> GetOrganizationPlans(string organizationId)
        {
            var organizationPlans = _context.plans.Where(x => x.OrganizationId == organizationId);
            return organizationPlans;

        }

        public async Task<List<ResultPlan>> GetUserPlans(string? id)
        {
            var userId = id ?? new HttpContextAccessor().HttpContext?.User.FindFirst(ClaimTypes.Name)?.Value;
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();

            var userPlans = new List<ResultPlan>();
            try
            {
                const string userPlansQuery = @"SELECT 
                    p.plan_id,
                    p.title,
                    p.creator_id AS CreatorId,
                    p.organization_id as OrganizationId,
                    p.creator_name as CreatorName
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
        
        public async Task<List<ResultPlan>> GetTrainerPlans(string? id)
        {
            var userId = id ?? new HttpContextAccessor().HttpContext?.User.FindFirst(ClaimTypes.Name)?.Value;
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();

            var userPlans = new List<ResultPlan>();
            try
            {
                const string userPlansQuery = @"SELECT 
		            p.plan_id,
		            p.title,
		            p.creator_id AS CreatorId,
		            p.organization_id as OrganizationId,
		            CONCAT(u.first_name, ' ', u.last_name) as CreatorName
		            FROM public.users as u
		            JOIN public.plans as p
		            ON p.creator_id = @userId
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
        
    }
}


