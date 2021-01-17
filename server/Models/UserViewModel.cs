using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class UserViewModel
    {
        [Key]
        public string UserId { get; set; }
        public byte[] Avatar { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public int PhoneNumber { get; set; }
    }
}