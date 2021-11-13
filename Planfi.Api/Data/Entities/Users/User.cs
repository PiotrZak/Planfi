using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using PlanfiApi.Data.ViewModels;
using WebApi.Data.Entities;
using WebApi.Data.Entities.Users;

namespace PlanfiApi.Data.Entities.Users
{
    public class User
    {
        public User(Role role, string organizationId, string email, string verificationToken)
        {
            UserId = Guid.NewGuid().ToString();
            Role = role;
            OrganizationId = organizationId;
            Email = email;
            VerificationToken = verificationToken;
            Avatar = new byte[] { 0x20, 0x20, 0x20, 0x20, 0x20, 0x20 };
        }

        public User()
        { }

        public string OrganizationId { get; set; }
        [Key]
        public string UserId { get; set; }
        public Role Role { get; set; }
        public ICollection<UsersPlans> Plans { get; set; }
        public ICollection<UsersTrainers> UsersTrainers { get; set; }
        public byte[] Avatar { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Token { get; set; }
        public string ResetToken { get; set; }
        public DateTime? ResetTokenExpires { get; set; }
        public DateTime PasswordReset { get; set; }
        public string VerificationToken { get; set; }
        public bool IsActivated { get; set; }
    };
}