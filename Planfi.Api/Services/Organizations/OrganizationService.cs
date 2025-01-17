using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using PlanfiApi.Data.Entities;
using PlanfiApi.Data.Entities.Users;
using PlanfiApi.Helpers;
using PlanfiApi.Interfaces;
using PlanfiApi.Models.SqlProjections;
using PlanfiApi.Models.ViewModels;
using WebApi.Entities;
using WebApi.Helpers;

namespace PlanfiApi.Services.Organizations
{
    public class OrganizationService : IOrganizationService
    {
        private DataContext _context;
        private IConfiguration Configuration { get; }

        public OrganizationService(DataContext context, IConfiguration configuration)
        {
            Configuration = configuration;
            _context = context;
        }

        public Organization Create(Organization Organization)
        {
            if (_context.organizations.Any(x => x.Name == Organization.Name))
                throw new AppException("Organization " + Organization.Name + " is already exist");

            _context.organizations.Add(Organization);
            _context.SaveChanges();

            return Organization;
        }

        public Organization GetById(string id)
        {

            var organization = _context.organizations.FirstOrDefault(x => x.OrganizationId == id);
            return organization;
        }
        public IEnumerable<Organization> GetAll()
        {

            return _context.organizations;
        }

        public void Delete(string[] id)
        {
            foreach (var OrganizationId in id)
            {
                var organization = _context.organizations.Find(OrganizationId);
                if (organization != null)
                {
                    _context.organizations.Remove(organization);
                    _context.SaveChanges();
                }
            }
        }

        public void AssignUsersToOrganization(string organizationId, string[] userIds)
        {
            var organization = GetById(organizationId);

            foreach (var id in userIds)
            {
                var element = _context.users.Find(id);
                organization.Users.Add(element);
            }
            _context.organizations.Update(organization);
            _context.SaveChanges();
        }
        
        
        //stupid :O - need to reavaluate and rewrite according new design 
        public IEnumerable<User> GetOrganizationUsers(string organizationId)
        {
            var users = _context.users.Where(x => x.OrganizationId == organizationId);
            return users;
        }


        public IEnumerable<User> GetOrganizationClients(string organizationId)
        {
            var usersInOrganization = _context.users.Where(x => x.OrganizationId == organizationId);
            var clients = usersInOrganization.Where(x => x.Role.Name == "User");
            return clients;
        }
        
        public async Task<List<UserSqlProjection>> GetUsers()
        {
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();

            var users = new List<UserSqlProjection>();
            try
            {
                users = await connection.QueryAsync<UserSqlProjection>(
            @"SELECT 
                u.user_id, 
                u.avatar, 
				r.name as role,
                u.first_name, 
                u.last_name, 
                u.email, 
                u.phone_number, 
                u.organization_id,
				u.is_activated
                FROM public.users as u
				JOIN public.role as r
				ON u.role_id = r.id
                "
                ) as List<UserSqlProjection>;
            }
            catch (Exception exp) {
                Console.Write(exp.Message);
            }
            finally
            {
                await connection.CloseAsync();
            }
            
            return users.ToList();
        }

        public IEnumerable<User> GetOrganizationTrainers(string organizationId)
        {
            var usersInOrganization = _context.users.Where(x => x.OrganizationId == organizationId);
            var trainers = usersInOrganization.Where(x => x.Role.Name == "Trainer");
            return trainers;
        }

        public User GetUserById(string organizationId, string userId)
        {
            var usersInOrganization = _context.users.Where(x => x.OrganizationId == organizationId);
            var user = usersInOrganization.FirstOrDefault(x => x.OrganizationId == organizationId);
            return user;
        }

        public void ChangeRole(string userId, string role)
        {
            var user = _context.users.FirstOrDefault(x => x.UserId == userId);

            if (!string.IsNullOrWhiteSpace(role))
                if (user != null)
                    user.Role.Name = role;

            _context.users.Update(user ?? throw new Exception());
            _context.SaveChanges();
        }
    }
}


