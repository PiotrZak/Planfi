
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace WebApi.Models
{
    public class UpdateExerciseModel
    {
        public UpdateExerciseModel()
        {
            Files = new List<IFormFile>();
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public int Repeats { get; set; }
        public int Times { get; set; }
        public int Series { get; set; }
        public int Weight { get; set; }
        public List<IFormFile> Files { get; set; }
    }
}
