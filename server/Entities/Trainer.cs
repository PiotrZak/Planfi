using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Entities
{
    public class Trainer
    {
        public Trainer()
        {
            TrainerId = Guid.NewGuid().ToString();
            Users = new List<User>();
            Plans = new List<Plan>();
        }

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
        public List<User> Users { get; set; }
    }
}
