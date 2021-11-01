﻿using System.ComponentModel.DataAnnotations;

namespace PlanfiApi.Models
{
    public class CreateCategory
    {
        [Required]
        public string Title { get; set; }
        //public string[] ExerciseId { get; set; }
        public string OrganizationId { get; set; }
    }
}