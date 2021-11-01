using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using PlanfiApi.Data.Entities;
using PlanfiApi.Helpers;
using PlanfiApi.Interfaces;
using PlanfiApi.Models;
using PlanfiApi.Entities;

namespace PlanfiApi.Services.Exercises
{
    public class CategoryService : ICategoryService
    {
        private readonly DataContext _context;

        public CategoryService(DataContext context)
        {
            _context = context;
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
        
        //check performance
        public IEnumerable<CategoryViewModel> GetAll()
        {
            var allCategories = _context.categories.ToList();
            var transformModel = new List<CategoryViewModel>();
            
            foreach (var category in allCategories)
            {
                var exercises = _context.exercises
                    .Where(
                        x => x.CategoryId == category.CategoryId &&
                             x.Repeats == 0 &&
                             x.Series == 0 &&
                             x.Weight == 0 &&
                             x.Repeats == 0
                        );

                var transformCategoryModel = new CategoryViewModel
                {
                    CategoryId = category.CategoryId,
                    Title = category.Title,
                    Exercises = exercises.Count(),
                    OrganizationId = category.OrganizationId
                };
                transformModel.Add(transformCategoryModel);
            }
            return transformModel;
        }
        
    public class CategoryViewModel
    {
        public string CategoryId { get; set; }
        public string Title { get; set; }
        public int Exercises { get; set; }
        public string OrganizationId { get; set; }
    }
    
        public void Delete(string[] id)
        {
            foreach (var categoryId in id)
            {
                var exercisesInCategory = _context.exercises.Where(x => x.CategoryId == categoryId);

                foreach (var exerciseItem in exercisesInCategory)
                {
                    exerciseItem.CategoryId = null;
                }

                var category = _context.categories.Find(categoryId);
                if (category != null)
                {
                    _context.categories.Remove(category);
                    _context.SaveChanges();
                }
            }
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
                    throw new AppException("Plan " + exercise.Name + " is already exist in this organization");
                }
            }
            
            category.Exercises.Add(exercise);
            _context.categories.Update(category);
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


