using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using PlanfiApi.Data.Entities;

namespace PlanfiApi.Models.UpdateModels
{
    public class UpdateExerciseModel
    {
        public UpdateExerciseModel()
        {
          FilesToAdd = new List<IFormFile>();
        }

        public string Name { get; set; }
        public string Description { get; set; }
        public List<Serie>? Series { get; set; }
        public List<string>? Files { get; set; }
        public List<IFormFile>? FilesToAdd { get; set; }
        public List<string>? FilesToDelete { get; set; }
    }
}
