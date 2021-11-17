using System.Collections.Generic;
using System.Threading.Tasks;
using PlanfiApi.Data.Entities.Users;
using PlanfiApi.Models;
using PlanfiApi.Models.SqlProjections;
using PlanfiApi.Models.ViewModels;
using WebApi.Models;

namespace PlanfiApi.Interfaces
{
    public interface IUserService
    {
        Task<User> Authenticate(string email, string password);
        User Register(string email);
        Task<User> GetUserWithoutPassword(string email);
        IEnumerable<User> GetAllUsers();
        Task<UserViewModel> GetById(string id);
        Task<UserDetails> UserDetailsViewModel(string userId);
        Task<int> Update(string id, UpdateUserModel model);
        Task Delete(string[] id);
        IEnumerable<User> GetByRole(string role);
        Task<int> AssignClientsToTrainers(string[] trainerIds, string[] userIds);
        Task<int> AssignPlanToClients(string[] userIds, string[] planIds);
        Task<List<UserSqlProjection>> GetClientsByTrainer(string? userId);
        Task<List<UserSqlProjection>> GetTrainersByClient(string? userId);
    }
}