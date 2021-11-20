using System.Collections.Generic;
using PlanfiApi.Data.Entities;

namespace PlanfiApi.Models.ViewModels
{
    [GenerateTypeScriptInterface]
    public class ExerciseViewModel
    {
        public string ExerciseId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public byte[][]? Files { get; set; }
        public string CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string? PlanId { get; set; }
        public List<Serie>? Series { get; set; }
    }

}
