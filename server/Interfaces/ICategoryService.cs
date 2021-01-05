using System.Collections.Generic;
using System.Threading.Tasks;
using HotChocolate.Types;
using WebApi.Entities;
using WebApi.Models;
using WebApi.Services;

namespace WebApi.Interfaces
{
    public interface ICategoryService
    {
        Category GetById(string id);
        int GetExercisesLengthFromCategory(string id);
        Category Create(Category category);
        IEnumerable<CategoryService.CategoryViewModel> GetAll();
        void Delete(string[] id);
        void AssignExercise(string id, Exercise exercise);
        void AssignExercisesToCategory(string categoryId, IEnumerable<string> id);
        Task<int> Update(UpdateCategoryModel model, string id);
    }
}