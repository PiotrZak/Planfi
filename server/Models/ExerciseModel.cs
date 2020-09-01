using System;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models
{
    public class ExerciseModel
    {
        [Key]
        public string Name { get; set; }
        public string Description { get; set; }
        public int Times { get; set; }
        public int Series { get; set; }
        public byte[] File { get; set; }
    }
}
