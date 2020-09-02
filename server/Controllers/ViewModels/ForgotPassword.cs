using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Controllers.ViewModels
{
    public class ForgotPassword
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
