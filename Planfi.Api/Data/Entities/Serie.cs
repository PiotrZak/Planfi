using System.ComponentModel.DataAnnotations;

namespace PlanfiApi.Data.Entities
{
    public class Serie
    {
        [Key]
        public string SerieId { get; set; }
        public int Times { get; set; }
        public int Weight { get; set; }
        public int Repeats { get; set; }
        public string? ExerciseId { get; set; }
    }
}
