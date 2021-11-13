using System.Collections.Generic;
using PlanfiApi.Data.Entities;

namespace PlanfiApi.Data.ViewModels
{
    public class AssignExerciseToPlan
    {
        public string PlanId { get; set; }
        public string[] ExerciseId { get; set; }
        public List<Serie> Series { get; set; }
    }
}