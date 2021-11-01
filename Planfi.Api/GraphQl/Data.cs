using System.Collections.Generic;
using System.Linq;
using HotChocolate;
using PlanfiApi.Data.Entities;
using PlanfiApi.Helpers;
using PlanfiApi.Interfaces;
using PlanfiApi.Models.ViewModels;
using PlanfiApi.Services.Exercises;

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
        
        [HotChocolate.Data.UseFiltering]
        public Exercise GetExercise(
           [Service] DataContext dbContext, string id) =>
               dbContext.exercises.FirstOrDefault(x => x.ExerciseId == id);
        
        [HotChocolate.Data.UseFiltering]
        public List<CategoryService.CategoryViewModel> GetCategories([Service] DataContext dbContext) =>
            _categoryService.GetAll().ToList();
        
        [HotChocolate.Data.UseFiltering]
        public List<Plan> GetPlans([Service] DataContext dbContext) =>
            _planService.GetAll().ToList();
        
        [HotChocolate.Data.UseFiltering]
        public List<ExerciseViewModel> GetSerializedExercises([Service] DataContext dbContext) => 
            _exerciseService.GetSerializedExercises().ToList();
        
        [HotChocolate.Data.UseFiltering]
        public List<ExerciseViewModel> GetSerializedExercisesInstances([Service] DataContext dbContext) => 
            _exerciseService.GetSerializedExercisesInstances().ToList();
        
        [HotChocolate.Data.UseFiltering]
        public List<UserViewModel> GetUsers([Service] DataContext dbContext) => 
            _organizationService.GetUsers().ToList();
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
