namespace WebApi.Models
{
    public class UnAssignExerciseToPlan
    {
        public string PlanId { get; set; }
        public string[] ExerciseId { get; set; }
    }
}