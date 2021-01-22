using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.ViewModels
{
    public class ActivateAccount
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
        public string VerificationToken { get; set; }
    }
}