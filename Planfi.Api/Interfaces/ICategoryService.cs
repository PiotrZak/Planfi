using System.Collections.Generic;
using System.Threading.Tasks;
using PlanfiApi.Data.Entities;
using PlanfiApi.Models;
using PlanfiApi.Services.Exercises;
using PlanfiApi.Entities;
using PlanfiApi.Services;

namespace PlanfiApi.Interfaces
{
    public interface ICategoryService
    {
        Category GetById(string id);
        Category Create(Category category);
        IEnumerable<CategoryService.CategoryViewModel> GetAll();
        void Delete(string[] id);
        Task<int> AssignExercise(string id, Exercise exercise);
        void AssignExercisesToCategory(string categoryId, IEnumerable<string> id);
        Task<int> Update(UpdateCategoryModel model, string id);
    }
}