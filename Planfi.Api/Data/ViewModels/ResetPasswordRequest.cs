using System.ComponentModel.DataAnnotations;

namespace WebApi.Data.ViewModels
{
    public class ResetPasswordRequest
    {
        [Required]
        public string Token { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }
        
    }
}