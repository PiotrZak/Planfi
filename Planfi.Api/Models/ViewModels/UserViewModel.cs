using System.ComponentModel.DataAnnotations;
using PlanfiApi.Data.Entities.Users;

namespace PlanfiApi.Models.ViewModels
{
    public class UserViewModel
    {
        [Key]
        public string UserId { get; set; }
        public byte[]? Avatar { get; set; }
        public string? Token { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Role Role { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string OrganizationId { get; set; }
    }
}