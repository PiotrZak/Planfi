using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WebApi.Controllers.ViewModels;

namespace WebApi.Entities
{
    public class User
    {
        public User()
        {
            UserId = Guid.NewGuid().ToString();
            Avatar = new byte[] { 0x20, 0x20, 0x20, 0x20, 0x20, 0x20 };
            UsersPlans = new List<UsersPlans>();
        }

        [Key]
        public string UserId { get; set; }
        public byte[] Avatar { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int PhoneNumber { get; set; }
        public string Password { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }

        public virtual ICollection<UsersPlans> UsersPlans { get; set; }


        //public List<AssignPlansToUser> PlanIds { get; set; }
        //public string TrainerId { get; set; }
        //public List<Plan> Plans { get; set; }
    }
}