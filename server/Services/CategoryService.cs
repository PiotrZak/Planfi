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

            var Category = _context.Categories.FirstOrDefault(x => x.Id == id);
            return Category;
        }
        public IEnumerable<Category> GetAll()
        {

            return _context.Categories;
        }
    }
}


