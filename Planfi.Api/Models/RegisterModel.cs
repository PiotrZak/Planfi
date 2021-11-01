using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using PlanfiApi.Entities;

namespace PlanfiApi.Models
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