using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql;
using PlanfiApi.Data.Entities;
using PlanfiApi.Helpers;
using PlanfiApi.Interfaces;
using PlanfiApi.Models.ViewModels;
using WebApi.Helpers;
using WebApi.Models;

namespace PlanfiApi.Services.Exercises
{
    public class CategoryService : ICategoryService
    {
        private readonly DataContext _context;
        private IConfiguration Configuration { get; }
        private readonly IExerciseService _exerciseService;

        public CategoryService(DataContext context, IConfiguration configuration, IExerciseService exerciseService)
        {
            Configuration = configuration;
            _context = context;
            _exerciseService = exerciseService;
        }

        public Category Create(Category category)
        {
            var duplication = _context.categories
                  .Where(x => x.OrganizationId == category.OrganizationId)
                  .Any(x => x.Title == category.Title);
            
            if (duplication)
                throw new AppException("Category " + category.Title + " is already exist");
           
            _context.categories.Add(category);
            _context.SaveChanges();

            return category;
        }

        public Category GetById(string id)
        {

            var category = _context.categories.FirstOrDefault(x => x.CategoryId == id);
            return category;
        }
        
        public async Task <List<CategoryViewModel>> GetAll()
        {
          var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
          await connection.OpenAsync();

          var categories = new List<CategoryViewModel>();
          try
          {
            const string categoriesQuery = @"SELECT 
              c.category_id as CategoryId,
              c.title as Title,
              c.organization_id as OrganizationId,
              Count(e) as Exercises
              FROM public.categories as c
              JOIN public.exercises as e
              on e.category_id = c.category_id
              GROUP BY c.category_id
              ORDER BY Count(e) DESC";

            categories = (await connection.QueryAsync<CategoryViewModel>(categoriesQuery)).ToList();
          }
          catch (Exception exp) {
            Console.Write(exp.Message);
          }
          finally
          {
            await connection.CloseAsync();
          }
            
          return categories.Where(x => x.Exercises > 0).ToList();
        }
        
        public async Task<int> Delete(string[] ids)
        {
            var categories = await _context.categories
                .Where(x => ids.Contains(x.CategoryId))
                .OrderBy(x => x.CategoryId)
                .ToListAsync();
            
            var exercisesInCategory = _context.exercises
                .Where(x => ids.Contains(x.CategoryId))
                .ToList();
            
            var idsOfExercises = exercisesInCategory.Select(x => x.ExerciseId).ToArray();;
            var deletedExercises = await _exerciseService.Delete(idsOfExercises);
            _context.categories.RemoveRange(categories);
            
            var count = await _context.SaveChangesAsync();
            return count + deletedExercises;
            
        }

        public async Task<int> AssignExercise(string id, Exercise exercise)
        {
            var category = await _context.categories.FindAsync(id);
            
            var isDuplicated = _context.exercises.Any(x => x.Name == exercise.Name);
            if (isDuplicated)
            {
                var duplicatedExercises = _context.exercises.Where(x => x.Name == exercise.Name).ToList();

                if (duplicatedExercises.Any(duplicatedExercise => duplicatedExercise.CategoryId == exercise.CategoryId))
                {
                    throw new AppException(exercise.Name + " is already in this category");
                }
            }

            if (category != null)
            {
                category.Exercises.Add(exercise);
                _context.categories.Update(category);
            }

            await _context.SaveChangesAsync();
            return 1;
        }

        public void AssignExercisesToCategory(string categoryId, IEnumerable<string> exerciseId)
        {
            var category = GetById(categoryId);

            foreach (var id in exerciseId)
            {
                var element = _context.exercises.Find(id);
                category.Exercises.Add(element);
            }
            _context.categories.Update(category);
            _context.SaveChanges();
        }

        public async Task<int> Update(UpdateCategoryModel model, string id)
        {
            try
            {
                var category = await _context.categories.FindAsync(id);

                if (category == null)
                    throw new AppException("Category not found!");
                
                var isDuplicated = _context.categories.Any(x => x.Title == model.Title);
                if (isDuplicated)
                {
                    var duplicatedCategories = _context.categories.Where(x => x.Title == model.Title).ToList();

                    foreach (var duplicatedPlan in duplicatedCategories)
                    {
                        if(duplicatedPlan.OrganizationId == category.OrganizationId)
                            throw new AppException("Category " + model.Title + " is already exist in this organization");
                    }
                }

                if (!string.IsNullOrWhiteSpace(model.Title))
                {
                    category.Title = model.Title;
                }
                _context.categories.Update(category);
                return await _context.SaveChangesAsync();
            }
            catch (ValidationException)
            {
                return 0;
            }
        }
    }
}


