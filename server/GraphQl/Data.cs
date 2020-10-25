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

namespace WebApi.GraphQl
{

    public class Query
    {
        public Category GetCategory(
           [Service] DataContext dbContext, string id) =>
               dbContext.Categories.FirstOrDefault(x => x.CategoryId == id);

        public Exercise GetExercise(
           [Service] DataContext dbContext, string id) =>
               dbContext.Exercises.FirstOrDefault(x => x.ExerciseId == id);


        public List<Category> GetCategories([Service] DataContext dbContext) => dbContext.Categories.Include(x => x.Exercises).ToList();
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
