using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Data.Entities.Users
{

    public abstract class User
    {
        protected User()
        {
            UserId = Guid.NewGuid().ToString();
            Avatar = new byte[] { 0x20, 0x20, 0x20, 0x20, 0x20, 0x20 };
        }
        public string OrganizationId { get; set; }
        [Key]
        public string UserId { get; set; }
        public byte[] Avatar { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
        public string ResetToken { get; set; }
        public DateTime? ResetTokenExpires { get; set; }
        public DateTime PasswordReset { get; set; }
        public string VerificationToken { get; set; }
        public bool IsActivated { get; set; }
    };
}