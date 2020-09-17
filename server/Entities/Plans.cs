using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WebApi.Controllers.ViewModels;

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
        public string Creator { get; set; }

        public List<Exercise> Exercises { get; set; }

        public virtual ICollection<UsersPlans> UsersPlans { get; set; }

        //public List<AssignPlansToUser> UserIds{ get; set; }
        //public List<Trainer> Trainers { get; set; }
    }
}