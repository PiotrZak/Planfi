using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PlanfiApi.Models
{
    public class CreateOrganization
    {
        [Required]
        public string Name { get; set; }
        //public string[] ExerciseId { get; set; }
    }
}