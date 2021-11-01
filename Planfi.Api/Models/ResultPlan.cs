using System;
using System.ComponentModel.DataAnnotations;

namespace PlanfiApi.Models
{
    public class ResultPlan
    {
        public ResultPlan()
        {
            PlanId = Guid.NewGuid().ToString();
        }

        [Key]
        public string PlanId { get; set; }
        public string Title { get; set; }
        public string CreatorId { get; set; }
        public string CreatorName { get; set; }
    }
}
