using System.Collections.Generic;
using System.Threading.Tasks;
using PlanfiApi.Data.Entities.Users;
using PlanfiApi.Services.Organizations;
using WebApi.Data.Entities.Users;
using WebApi.Entities;

namespace PlanfiApi.Interfaces
{
    public interface IOrganizationService
    {
        Organization GetById(string id);
        Organization Create(Organization Organization);
        IEnumerable<Organization> GetAll();
        IEnumerable<User> GetOrganizationUsers(string organizationId);
        IEnumerable<User> GetOrganizationTrainers(string organizationId);
        IEnumerable<User> GetOrganizationClients(string organizationId);
        Task<List<OrganizationService.UserSqlProjection>> GetUsers();
        User GetUserById(string organizationId, string userId);
        void Delete(string[] id);
        void AssignUsersToOrganization(string organizationId, string[] userIds);
        void ChangeRole(string userId, string role);
    }
}