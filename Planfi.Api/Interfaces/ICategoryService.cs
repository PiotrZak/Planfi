using System.Collections.Generic;
using System.Threading.Tasks;
using PlanfiApi.Services.Exercises;
using WebApi.Data.Entities;
using WebApi.Entities;
using WebApi.Models;

namespace PlanfiApi.Interfaces
{
    public interface ICategoryService
    {
        Category GetById(string id);
        Category Create(Category category);
        IEnumerable<CategoryService.CategoryViewModel> GetAll();
        Task<int> Delete(string[] id);
        Task<int> AssignExercise(string id, Exercise exercise);
        void AssignExercisesToCategory(string categoryId, IEnumerable<string> id);
        Task<int> Update(UpdateCategoryModel model, string id);
    }
}