using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Controllers.Exercises
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ExercisesController : ControllerBase
    {
        private readonly IExerciseService _exerciseService;
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public ExercisesController(
            ICategoryService categoryService,
            IExerciseService exerciseService,
            IMapper mapper
            )
        {
            _categoryService = categoryService;
            _exerciseService = exerciseService;
            _mapper = mapper;
        }
        
        [AllowAnonymous]
        [HttpPost("create")]
        public async Task<IActionResult> CreateExercise([FromForm] CreateExercise model)
        {
            var convertedModel = await _exerciseService.TransformData(model);
            var exercise = _mapper.Map<Exercise>(convertedModel);
            try
            {
                await _categoryService.AssignExercise(model.CategoryId, exercise);
                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        
        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll()
        {
            var exercises = _exerciseService.GetAll();
            return Ok(exercises);
        }
        
        [AllowAnonymous]
        [HttpGet("organization/{organizationId}")]
        public async Task<IActionResult> GetAllByOrganization(string organizationId)
        {
            var exercises = await _exerciseService.GetAllByOrganization(organizationId);
            return Ok(exercises);
        }

        [AllowAnonymous]
        [HttpGet("category/{categoryId}")]
        public IActionResult GetExercisesByCategory(string categoryId)
        {
            var exercises = _exerciseService.GetAllOfCategory(categoryId);

            if (exercises == null)
                return NotFound();

            return Ok(exercises);
        }

        [AllowAnonymous]
        [HttpGet("plan/{planId}")]
        public IActionResult GetExercisesByPlan(string planId)
        {
            var exercises = _exerciseService.GetAllOfPlan(planId);

            if (exercises == null)
                return NotFound();

            return Ok(exercises);
        }


        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var exercise = _exerciseService.GetById(id);

            if (exercise == null)
                return NotFound();

            return Ok(exercise);
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromForm] UpdateExerciseModel model)
        {
            
            var filesList = new List<byte[]>();
            if (model.Files != null)
            {
                foreach (var formFile in model.Files.Where(formFile => formFile.Length > 0))
                {
                    using var memoryStream = new MemoryStream();
                    formFile.CopyTo(memoryStream);
                    filesList.Add(memoryStream.ToArray());
                }
            }
            
            var transformModel = new ExerciseModel
            {
                Name = model.Name,
                Description = model.Description,
                Repeats = model.Repeats,
                Times = model.Times,
                Series = model.Series,
                Weight = model.Weight,
                Files = filesList,
            };

            var exercise = _mapper.Map<Exercise>(transformModel);
            exercise.ExerciseId = id;

            try
            {
                await _exerciseService.Update(exercise, id);
                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [AllowAnonymous]
        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromBody] string[] id)
        {
            await _exerciseService.Delete(id);
            return Ok();
        }
    }
}
