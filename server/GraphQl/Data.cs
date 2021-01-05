using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Services;

namespace WebApi.GraphQl
{

    public class Query
    {
        private readonly ICategoryService _categoryService;
        public Query(
            ICategoryService categoryService)
        {
            _categoryService = categoryService ; ;
        }
        public Exercise GetExercise(
           [Service] DataContext dbContext, string id) =>
               dbContext.Exercises.FirstOrDefault(x => x.ExerciseId == id);


        public List<CategoryService.CategoryViewModel> GetCategories([Service] DataContext dbContext) =>
            _categoryService.GetAll().ToList();
        
        
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
