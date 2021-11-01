using PlanfiApi.Models;

namespace PlanfiApi.Data.ViewModels
{
    public class AssignExerciseToPlan
    {
        public string PlanId { get; set; }
        public string[] ExerciseId { get; set; }

        public ExerciseUpdateModel ExerciseModel;
    }
}