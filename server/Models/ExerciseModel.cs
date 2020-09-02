using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace WebApi.Models
{
    public class ExerciseModel
    {
        [Key]
        public string Name { get; set; }
        public string Description { get; set; }
        public int Times { get; set; }
        public int Series { get; set; }
        public List<IFormFile> File { get; set; }
    }
}
