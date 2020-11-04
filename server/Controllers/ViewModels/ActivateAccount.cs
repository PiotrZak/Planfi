using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.ViewModels
{
    public class ActivateAccount
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int PhoneNumber { get; set; }
        [Required]
        [MinLength(6)]
        public string Password { get; set; }
        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
    }
}