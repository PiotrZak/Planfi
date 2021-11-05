using System.Collections.Generic;
using System.Threading.Tasks;
using PlanfiApi.Data.Entities.Users;
using PlanfiApi.Models.ViewModels;
using PlanfiApi.Services.Organizations;
using WebApi.Models;

namespace PlanfiApi.Interfaces
{
    public interface IUserService
    {
        Task<User> Authenticate(string email, string? password);
        User Register(string email);
        Task<User> GetUserWithoutPassword(string email);
        IEnumerable<User> GetAllUsers();
        Task<UserViewModel> GetById(string id);
        Task<int> Update(string id, UpdateUserModel model);
        Task Delete(string[] id);
        IEnumerable<User> GetByRole(string role);
        Task<int> AssignClientsToTrainers(string[] trainerIds, string[] userIds);
        Task<int> AssignPlanToClients(string[] userIds, string[] planIds);
        //void UnAssignClientsToTrainers(string trainerId, string[] usersId);
        //void UnAssignPlanToClients(string[] userIds, string[] planIds);
        Task<IEnumerable<OrganizationService.UserSqlProjection>> GetClientsByTrainer();
        Task<IEnumerable<User>> GetTrainersByClient(string clientId);
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
    }
}