namespace PlanfiApi.Models.ViewModels
{
    public class ExerciseViewModel
    {
        public ExerciseViewModel()
        {
            File = new string("");
        }
        public string ExerciseId { get; set; }
        public string Name { get; set; }
        public string? File { get; set; }
        public string CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string PlanId { get; set; }
        public int? Series { get; set; } 
        public int? Repeats { get; set; }
    }

}