namespace WebApi.Models
{
    public class AssignExerciseToPlan
    {
        public string PlanId { get; set; }
        public string[] ExerciseId { get; set; }

        public ExerciseUpdateModel ExerciseModel;
    }
}