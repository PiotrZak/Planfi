using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface ICategoryService
    {
        Category GetById(string id);
        Category Create(Category Category);
        IEnumerable<Category> GetAll();
        void Delete(string id);
        void AssignExercise(string id, Exercise Exercise);
    }

    public class CategoryService : ICategoryService
    {
        private DataContext _context;

        public CategoryService(DataContext context)
        {
            _context = context;
        }

        public Category Create(Category Category)
        {
           
            _context.Categories.Add(Category);
            _context.SaveChanges();

            return Category;
        }

        public Category GetById(string id)
        {

            var Category = _context.Categories.FirstOrDefault(x => x.CategoryId == id);
            return Category;
        }
        public IEnumerable<Category> GetAll()
        {

            return _context.Categories;
        }
        public void Delete(string id)
        {
            var category = _context.Categories.Find(id);
            var exercisesInCategory = _context.Exercises.Where(x => x.CategoryId == id);

            foreach (var item in exercisesInCategory)
            {
                var element = _context.Exercises.Find(item.ExerciseId);
                category.Exercises.Remove(element);
            }

            if (category != null)
            {
                _context.Categories.Remove(category);
                _context.SaveChanges();
            }
        }


        public void AssignExercise(string id, Exercise Exercise)
        {
            var Category = _context.Categories.Find(id);

            Category.Exercises.Add(Exercise);

            _context.Categories.Update(Category);
            _context.SaveChanges();
        }

    }
}


