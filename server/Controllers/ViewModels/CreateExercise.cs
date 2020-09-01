using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace WebApi.Models
{
    public class CreateExercise
    {

        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public int Times { get; set; }
        public int Series { get; set; }
        [Required]
        //public List <IFormFile> File { get; set; }
        public IFormFile File { get; set; }
    }
}
