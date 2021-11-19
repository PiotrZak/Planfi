using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using PlanfiApi.Data.Entities;
using PlanfiApi.Helpers;
using PlanfiApi.Interfaces;
using PlanfiApi.Models.SqlProjections;
using PlanfiApi.Models.ViewModels;
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
        public async Task<List<CategoryViewModel>> GetCategories([Service] DataContext dbContext) =>
            await _categoryService.GetAll();
        
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
        public async Task<List<UserSqlProjection>> GetUsers([Service] DataContext dbContext) => 
            await _organizationService.GetUsers();
    }
}
