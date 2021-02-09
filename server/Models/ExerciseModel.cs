#nullable enable
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using WebApi.Entities;

namespace WebApi.Models
{
    public class ExerciseModel
    {
        [Key]
        [Required]
        public string Name { get; set; }
        [Required]
        public string CategoryId { get; internal set; }
        public string? Description { get; set; }
        public List<byte[]>? Files { get; set; }
        public int Repeats { get; set; }
        public int Times { get; set; }
        public int Series { get; set; }
        public int Weight { get; set; }

    }
}
