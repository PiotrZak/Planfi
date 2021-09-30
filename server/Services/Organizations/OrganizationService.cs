using System;
using System.Collections.Generic;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using WebApi.Data.Entities.Users;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Services
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
            if (_context.Organizations.Any(x => x.Name == Organization.Name))
                throw new AppException("Organization " + Organization.Name + " is already exist");

            _context.Organizations.Add(Organization);
            _context.SaveChanges();

            return Organization;
        }

        public Organization GetById(string id)
        {

            var organization = _context.Organizations.FirstOrDefault(x => x.OrganizationId == id);
            return organization;
        }
        public IEnumerable<Organization> GetAll()
        {

            return _context.Organizations;
        }

        public void Delete(string[] id)
        {
            foreach (var OrganizationId in id)
            {
                var organization = _context.Organizations.Find(OrganizationId);
                if (organization != null)
                {
                    _context.Organizations.Remove(organization);
                    _context.SaveChanges();
                }
            }
        }

        public void AssignUsersToOrganization(string organizationId, string[] userIds)
        {
            var organization = GetById(organizationId);

            foreach (var id in userIds)
            {
                var element = _context.Users.Find(id);
                organization.Users.Add(element);
            }
            _context.Organizations.Update(organization);
            _context.SaveChanges();
        }
        
        public IEnumerable<User> GetOrganizationUsers(string organizationId)
        {
            var users = _context.Users.Where(x => x.OrganizationId == organizationId);
            return users;
        }


        public IEnumerable<User> GetOrganizationClients(string organizationId)
        {
            var usersInOrganization = _context.Users.Where(x => x.OrganizationId == organizationId);
            var clients = usersInOrganization.Where(x => x.Role.Name == "User");
            return clients;
        }

        public IEnumerable<UserViewModel> GetUsers()
        {
            //dapper query
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            connection.Open();

            var users = connection.Query<UserViewModel>(
                "SELECT \u0022UserId\u0022, \u0022Avatar\u0022, \u0022FirstName\u0022, \u0022LastName\u0022, \u0022Role\u0022, \u0022Email\u0022, \u0022PhoneNumber\u0022, \u0022OrganizationId\u0022 FROM public.\u0022Users\u0022 WHERE \u0022IsActivated\u0022 = true");

            return (List<UserViewModel>) users;
        }

        public IEnumerable<User> GetOrganizationTrainers(string organizationId)
        {
            var usersInOrganization = _context.Users.Where(x => x.OrganizationId == organizationId);
            var trainers = usersInOrganization.Where(x => x.Role.Name == "Trainer");
            return trainers;
        }

        public User GetUserById(string organizationId, string userId)
        {
            var usersInOrganization = _context.Users.Where(x => x.OrganizationId == organizationId);
            var user = usersInOrganization.FirstOrDefault(x => x.OrganizationId == organizationId);
            return user;
        }

        public void ChangeRole(string userId, string role)
        {
            var user = _context.Users.FirstOrDefault(x => x.UserId == userId);

            if (!string.IsNullOrWhiteSpace(role))
                if (user != null)
                    user.Role.Name = role;

            _context.Users.Update(user ?? throw new Exception());
            _context.SaveChanges();
        }
    }
}


