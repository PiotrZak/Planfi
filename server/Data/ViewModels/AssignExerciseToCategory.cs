using System;
namespace WebApi.Controllers.ViewModels
{
    public class AssignExercisesToCategory
    {
        public string CategoryId { get; set; }
        public string[] ExerciseId { get; set; }
    }
}
