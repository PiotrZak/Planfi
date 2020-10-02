using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using WebApi.Helpers;

namespace WebApi.GraphQl
{

    public class Exercise
    {
        public Exercise()
        {
            ExerciseId = Guid.NewGuid().ToString();
            Files = new List<byte[]>();
        }

        [Key]
        public string ExerciseId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Times { get; set; }
        public int Series { get; set; }
        public int Weight { get; set; }
        [GraphQLIgnore]
        public List<byte[]> Files { get; set; }
        public string CategoryId { get; set; }
        public string PlanId { get; set; }
    }

    public class Category
    {
        public Category()
        {
            CategoryId = Guid.NewGuid().ToString();
            Exercises = new List<Exercise>();
        }

        [Key]
        public string CategoryId { get; set; }
        public string Title { get; set; }
        public List<Exercise> Exercises { get; set; }
    }

    public class Query
    {
        //By convention GetBook() will be declared book() in the query type.
        public Category GetCategory(
           [Service] DataContext dbContext, string id) =>
               dbContext.Categories.FirstOrDefault(x => x.CategoryId == id);

        public List<Category> GetCategories([Service] DataContext dbContext) => dbContext.Categories.Include(x => x.Exercises).ToList();

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
