using System;
namespace WebApi.Models
{
    public class TrainerClient
    {
        public string UserId { get; set; }
        public byte[] Avatar { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }
}
