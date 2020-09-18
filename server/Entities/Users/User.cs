using System;
using Microsoft.AspNetCore.Identity;

namespace WebApi.Entities
{

    public class ApplicationUser : IdentityUser
    {
        public virtual Client Client { get; set; }
        public virtual Trainer Trainer { get; set; }
    }

    //public class AppUser : IdentityUser
    //{
    //    public DomainUser DomainUser { get; set; }
    //}

    //public abstract class DomainUser
    //{
    //    public Guid Id { get; set; }
    //    public AppUser IdentityUser { get; set; }
    //}


    //public class User
    //{
    //    public User()
    //    {
    //        UserId = Guid.NewGuid().ToString();
    //        Avatar = new byte[] { 0x20, 0x20, 0x20, 0x20, 0x20, 0x20 };
    //        UsersPlans = new List<UsersPlans>();
    //        UsersTrainers = new List<UsersTrainers>();
    //    }

    //    [Key]
    //    public string UserId { get; set; }
    //    public byte[] Avatar { get; set; }
    //    public string FirstName { get; set; }
    //    public string LastName { get; set; }
    //    public string Email { get; set; }
    //    public int PhoneNumber { get; set; }
    //    public string Password { get; set; }
    //    public byte[] PasswordHash { get; set; }
    //    public byte[] PasswordSalt { get; set; }
    //    public string Role { get; set; }
    //    public string Token { get; set; }

    //    public virtual ICollection<UsersPlans> UsersPlans { get; set; }
    //    public virtual ICollection<UsersTrainers> UsersTrainers { get; set; }
    //}
}