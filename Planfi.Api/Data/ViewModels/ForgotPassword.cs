using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PlanfiApi.Controllers.ViewModels
{
    public class ForgotPassword
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
