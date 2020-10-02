using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Entities
{
    public class CategoryQL
    {
        public CategoryQL()
        {
            CategoryId = Guid.NewGuid().ToString();
            Exercises = new List<Exercise>();
        }

        [Key]
        public string CategoryId { get ; set; }
        public string Title { get; set; }
        public List<Exercise> Exercises { get; set; }
    }
}
