
using Microsoft.AspNetCore.Http;

namespace WebApi.Models
{
    public class UpdateUserModel
    {
        public IFormFile Avatar { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public string NewPassword { get; set; }
    }
}
