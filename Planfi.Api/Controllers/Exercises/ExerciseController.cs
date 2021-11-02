using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlanfiApi.Data.Entities;
using PlanfiApi.Data.ViewModels;
using PlanfiApi.Interfaces;
using PlanfiApi.Models.UpdateModels;
using PlanfiApi.Services.Files;
using WebApi.Helpers;

namespace PlanfiApi.Controllers.Exercises
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ExercisesController : ControllerBase
    {
        private readonly IExerciseService _exerciseService;
        private readonly IFileService _fileService;
        private readonly ICategoryService _categoryService;

        public ExercisesController(
            ICategoryService categoryService,
            IExerciseService exerciseService,
            IFileService fileService)
        {
            _categoryService = categoryService;
            _exerciseService = exerciseService;
            _fileService = fileService;
        }
        
        [AllowAnonymous]
        [HttpPost("create")]
        public async Task<IActionResult> CreateExercise([FromForm] CreateExercise model)
        {
            var files = new List<byte[]>();
            if (model.Files != null)
            {
                files = await _fileService.ProcessFileExercise(model.Files, model.Name);
            }

            var exercise = new Exercise()
            {
                ExerciseId = Guid.NewGuid().ToString(),
                Name = model.Name,
                Description = model.Description,
                Files = files.Any() ? files : null,
                CategoryId = model.CategoryId,
            };
                
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
        public async Task<IActionResult> GetById(string id)
        {
            var exercise = await _exerciseService.GetById(id);

            if (exercise == null)
                return NotFound();

            return Ok(exercise);
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromForm] UpdateExerciseModel model)
        {
            try
            {
                await _exerciseService.Update(model, id);
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
