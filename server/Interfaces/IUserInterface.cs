using System.Collections.Generic;
using WebApi.Entities;

namespace WebApi.Interfaces
{
    public interface IUserService
    {
        User Authenticate(string Email, string Password);
        User Register(string email);
        IEnumerable<User> GetAllUsers();
        IEnumerable<Client> GetAllClients();
        IEnumerable<Trainer> GetAllTrainers();
        User GetById(string id);
        void Update(User user, string password);
        void Delete(string[] id);
        IEnumerable<User> GetByRole(string role);
        void AssignClientsToTrainers(string[] TrainerIds, string[] UserIds);
        void AssignPlanToClients(string[] userIds, string[] planIds);
        //void UnAssignClientsToTrainers(string trainerId, string[] usersId);
        //void UnAssignPlanToClients(string[] userIds, string[] planIds);
        IEnumerable<Client> GetClientsByTrainer(string TrainerId);
        IEnumerable<Trainer> GetTrainersByClient(string ClientId);
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
    }
}