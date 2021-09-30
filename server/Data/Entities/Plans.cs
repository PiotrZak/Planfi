using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WebApi.Data.Entities.Users;

namespace WebApi.Data.Entities
{
    public sealed class Plan
    {
        public Plan()
        {
            PlanId = Guid.NewGuid().ToString();
            Exercises = new List<Exercise>();
            Users = new List<User>();
        }

        [Key]
        public string PlanId { get; set; }
        public string Title { get; set; }
        public string CreatorId { get; set; }
        public string CreatorName { get; set; }
        public string OrganizationId { get; set; }
        public List<Exercise> Exercises { get; set; }
        public ICollection<User> Users { get; set; }
    }
}