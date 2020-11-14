using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface ICategoryService
    {
        Category GetById(string id);
        Category Create(Category category);
        IEnumerable<Category> GetAll();
        void Delete(string[] id);
        void AssignExercise(string id, Exercise exercise);
        void AssignExercisesToCategory(string categoryId, IEnumerable<string> id);
        Task<int> Update(UpdateCategoryModel model, string id);
    }
}