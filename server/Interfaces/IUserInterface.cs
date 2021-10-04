using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Data.Entities.Users;
using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IUserService
    {
        User Authenticate(string email, string? password);
        User Register(string email);
        IEnumerable<User> GetAllUsers();
        Task<UserViewModel> GetById(string id);
        Task<int> Update(string id, UpdateUserModel model);
        Task Delete(string[] id);
        IEnumerable<User> GetByRole(string role);
        Task<int> AssignClientsToTrainers(string[] trainerIds, string[] userIds);
        Task<int> AssignPlanToClients(string[] userIds, string[] planIds);
        //void UnAssignClientsToTrainers(string trainerId, string[] usersId);
        //void UnAssignPlanToClients(string[] userIds, string[] planIds);
        Task<IEnumerable<User>> GetClientsByTrainer(string trainerId);
        Task<IEnumerable<User>> GetTrainersByClient(string clientId);
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
    }
}