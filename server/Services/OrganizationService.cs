using System.Collections.Generic;
using System.Linq;
using WebApi.Controllers.ViewModels;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IOrganizationService
    {
        Organization GetById(string id);
        Organization Create(Organization Organization);
        IEnumerable<Organization> GetAll();
        void Delete(string[] id);
        void AssignUsersToOrganization(string organizationId, string[] userIds);
    }

    public class OrganizationService : IOrganizationService
    {
        private DataContext _context;

        public OrganizationService(DataContext context)
        {
            _context = context;
        }

        public Organization Create(Organization Organization)
        {
            // throw error if the new Organization is already taken
            if (_context.Organizations.Any(x => x.Name == Organization.Name))
                throw new AppException("Organization " + Organization.Name + " is already exist");

            _context.Organizations.Add(Organization);
            _context.SaveChanges();

            return Organization;
        }

        public Organization GetById(string id)
        {

            var Organization = _context.Organizations.FirstOrDefault(x => x.OrganizationId == id);
            return Organization;
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
    }
}


