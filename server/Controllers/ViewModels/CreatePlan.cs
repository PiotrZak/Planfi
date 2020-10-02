using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class CreatePlan
    {
        [Required]
        public string Title { get; set; }
        public string OrganizationId { get; set; }
        public string CreatorId { get; set; }
        public string CreatorName { get; set; }
        //public string[] ExerciseId { get; set; }
    }
}