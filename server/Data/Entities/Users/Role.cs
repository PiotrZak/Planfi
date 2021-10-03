using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Data.Entities.Users
{
    public class Role
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public ICollection<User> Users { get; set; }
    }
    
    public class PossibleRoles
    {
        public const string User = "User";
        public const string Trainer = "Trainer";
        public const string Owner = "Owner";
        public const string Admin = "Admin";
        public string Name;
    }
    
}