﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PlanfiApi.Data.Entities
{
    public class Category
    {
        public Category()
        {
            CategoryId = Guid.NewGuid().ToString();
            Exercises = new List<Exercise>();
        }

        [Key]
        public string CategoryId { get; set; }
        public string Title { get; set; }
        public List<Exercise> Exercises { get; set; }
        public string OrganizationId { get; set; }
    }
}
