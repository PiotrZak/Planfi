using System.Collections.Generic;

namespace PlanfiApi.Models.ViewModels
{
    public class ExerciseViewModel
    {
        public string ExerciseId { get; set; }
        public string Name { get; set; }
        public byte[][] Files { get; set; }
        public string CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string PlanId { get; set; }
        public int? Series { get; set; } 
        public int? Repeats { get; set; }
        public int? Times { get; set; }
        public int? Weight { get; set; }
    }

}