using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IUserService
    {
        User Authenticate(string Email, string Password);
        User Register(string email);
        IEnumerable<User> GetAllUsers();
        IEnumerable<Client> GetAllClients();
        IEnumerable<Trainer> GetAllTrainers();
        UserViewModel GetById(string id);
        void Update(string id, UpdateUserModel model);
        void Delete(string[] id);
        IEnumerable<User> GetByRole(string role);
        Task<int> AssignClientsToTrainers(string[] TrainerIds, string[] UserIds);
        Task<int> AssignPlanToClients(string[] userIds, string[] planIds);
        //void UnAssignClientsToTrainers(string trainerId, string[] usersId);
        //void UnAssignPlanToClients(string[] userIds, string[] planIds);
        Task<IEnumerable<User>> GetClientsByTrainer(string TrainerId);
        Task<IEnumerable<User>> GetTrainersByClient(string ClientId);
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
    }
}