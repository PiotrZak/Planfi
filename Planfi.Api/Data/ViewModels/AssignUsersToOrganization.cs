using System;
namespace WebApi.Controllers.ViewModels
{
    public class AssignUsersToOrganization
    {
        public string OrganizationId { get; set; }
        public string[] UserId { get; set; }
    }
}

