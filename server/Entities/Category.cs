using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Entities
{
    public class Category
    {
        public Category()
        {
            CategoryId = Guid.NewGuid().ToString();
        }

        [Key]
        public string CategoryId { get; set; }
        public string Title { get; set; }
        public List<Exercise> Exercises { get; set; }
    }
}
