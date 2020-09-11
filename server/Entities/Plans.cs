using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Entities
{
    public class Plan
    {
        public Plan()
        {
            PlanId = Guid.NewGuid().ToString();
            Exercises = new List<Exercise>();
        }

        [Key]
        public string PlanId { get; set; }
        public string Title { get; set; }
        public List<Exercise> Exercises { get; set; }
    }
}