namespace PlanfiApi.Models.SqlProjections
{
    public class ExerciseSqlProjection
    {
        public string ExerciseId { get; set; }
        public string SerieId { get; set; }
        public string Name { get; set; }
        public byte[][] Files { get; set; }
        public string CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public string PlanId { get; set; }
        public int Times { get; set; }
        public int Weight { get; set; }
        public int Repeats { get; set; }
    }
}