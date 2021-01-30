
using System.Collections.Generic;
using System.Linq;
using HotChocolate;
using HotChocolate.Types;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Services;

namespace WebApi.GraphQl
{

    public class Query
    {
        private readonly ICategoryService _categoryService;
        private readonly IPlanService _planService;
        public Query(
            ICategoryService categoryService,
            IPlanService planService
            )
        {
            _categoryService = categoryService ;
            _planService = planService ;
        }
        
        [UseFiltering]
        public Exercise GetExercise(
           [Service] DataContext dbContext, string id) =>
               dbContext.Exercises.FirstOrDefault(x => x.ExerciseId == id);
        
        [UseFiltering]
        public List<CategoryService.CategoryViewModel> GetCategories([Service] DataContext dbContext) =>
            _categoryService.GetAll().ToList();
        
        [UseFiltering]
        public List<Plan> GetPlans([Service] DataContext dbContext) =>
            _planService.GetAll().ToList();
        
        [UseFiltering]
        public List<Exercise> GetExercises([Service] DataContext dbContext) => dbContext.Exercises.ToList();

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
