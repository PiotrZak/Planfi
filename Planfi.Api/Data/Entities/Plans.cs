using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PlanfiApi.Data.Entities
{
    public sealed class Plan
    {
        public Plan()
        {
            PlanId = Guid.NewGuid().ToString();
            Exercises = new List<Exercise>();
            Users = new List<UsersPlans>();
        }

        [Key]
        public string PlanId { get; set; }
        public string Title { get; set; }
        public string CreatorId { get; set; }
        
        //todo - creator Name is bugged
        public string CreatorName { get; set; }
        public string OrganizationId { get; set; }
        public List<Exercise> Exercises { get; set; }
        public ICollection<UsersPlans> Users { get; set; }
    }
}