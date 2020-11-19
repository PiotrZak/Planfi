using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace WebApi.Models
{
    public partial class ModifyExercise
    {

        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public int Times { get; set; }
        public int Series { get; set; }
        public int Weight { get; set; }
        [Required]
        public List<IFormFile> Files { get; set; }
        public string CategoryId { get; set; }
    }
}
