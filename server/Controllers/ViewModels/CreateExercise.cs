using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace WebApi.Models
{
    public partial class CreateExercise
    {

        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public List<IFormFile> Files { get; set; }
        public string CategoryId { get; set; }
    }
}
