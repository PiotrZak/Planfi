using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PlanfiApi.Data.Entities
{
    public class Exercise
    {
        public Exercise()
        {
            ExerciseId = Guid.NewGuid().ToString();
            Files = new List<byte[]>();
            Series = new List<Serie>();
        }
        
        [Key]
        public string ExerciseId { get; set; }
        [MaxLength(160)]
        public string Name { get; set; }
        [MaxLength(3600000)]
        public string Description { get; set; }
        public virtual ICollection<Serie> Series { get; set; }
        public List<byte[]>? Files { get; set; }
        public string CategoryId { get; set; }
        public string PlanId { get; set; }
    }
}