using System.Collections.Generic;
using WebApi.Data.Entities.Users;
using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IOrganizationService
    {
        Organization GetById(string id);
        Organization Create(Organization Organization);
        IEnumerable<Organization> GetAll();
        IEnumerable<User> GetOrganizationUsers(string organizationId);
        IEnumerable<User> GetOrganizationTrainers(string organizationId);
        IEnumerable<User> GetOrganizationClients(string organizationId);
        IEnumerable<UserViewModel> GetUsers();
        User GetUserById(string organizationId, string userId);
        void Delete(string[] id);
        void AssignUsersToOrganization(string organizationId, string[] userIds);
        void ChangeRole(string userId, string role);
    }
}