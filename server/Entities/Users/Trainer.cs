using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WebApi.Controllers.ViewModels;

namespace WebApi.Entities
{
    public class Trainer
    {
        public Trainer()
        {
            TrainerId = Guid.NewGuid().ToString();
            Avatar = new byte[] { 0x20, 0x20, 0x20, 0x20, 0x20, 0x20 };
            Plans = new List<Plan>();
            UsersTrainers = new List<UsersTrainers>();
        }

        public virtual ApplicationUser User { get; set; }

        [Key]
        public string TrainerId { get; set; }

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

        public List<Plan> Plans { get; set; }
        public virtual ICollection<UsersTrainers> UsersTrainers { get; set; }
    }
}
