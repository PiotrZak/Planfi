using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using PlanfiApi.Data.Entities;
using PlanfiApi.Interfaces;
using PlanfiApi.Models.ViewModels;
using PlanfiApi.Services.Organizations;
using WebApi.Helpers;

namespace PlanfiApi.GraphQl
{

    public class Query
    {
        private readonly ICategoryService _categoryService;
        private readonly IPlanService _planService;
        private readonly IExerciseService _exerciseService;
        private readonly IOrganizationService _organizationService;
        
        public Query(
            ICategoryService categoryService,
            IPlanService planService,
            IExerciseService exerciseService, 
            IOrganizationService organizationService
            )
        {
            _categoryService = categoryService ;
            _planService = planService ;
            _exerciseService = exerciseService;
            _organizationService = organizationService;
        }
        
        [UseFiltering]
        public async Task<ExerciseViewModel> GetExercise([Service] DataContext dbContext, string id) =>
            await _exerciseService.GetById(id);
        
        [UseFiltering]
        public List<CategoryViewModel> GetCategories([Service] DataContext dbContext) =>
            _categoryService.GetAll().ToList();
        
        [UseFiltering]
        public async Task<List<Plan>> GetPlans([Service] DataContext dbContext) =>
            await _planService.GetAll();
        
        [UseFiltering]
        public async Task<List<ExerciseViewModel>> GetAllBaseExercises([Service] DataContext dbContext) => 
            await _exerciseService.GetAllBaseExercises();

        [UseFiltering]
        public async Task<List<ExerciseViewModel>> GetSerializedExercisesInstances([Service] DataContext dbContext) => 
            await _exerciseService.GetSerializedExercisesInstances();
        
        [UseFiltering]
        public async Task<List<OrganizationService.UserSqlProjection>> GetUsers([Service] DataContext dbContext) => 
            await _organizationService.GetUsers();
    }
    
    public static class ExtensionMethods
    {
        public static IEnumerable<Exercise> WithoutFiles(this IEnumerable<Exercise> exercises)
        {
            if (exercises == null) return null;
            return exercises.Select(x => x.WithoutFile());
        }

        public static Exercise WithoutFile(this Exercise exercise)
        {
            if (exercise == null) return null;

            exercise.Files = null;
            return exercise;
        }
    }

}
