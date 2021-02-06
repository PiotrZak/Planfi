using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models
{
    public class RegisterModel
    {
        [Required]
        public string OrganizationId { get; set; }
        [Required]
        public List<string> Emails { get; set; }
        
        public string Role { get; set; }
    }
}