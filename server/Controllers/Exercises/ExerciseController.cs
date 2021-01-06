using System;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Entities;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using WebApi.Models;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using WebApi.Interfaces;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ExercisesController : ControllerBase
    {
        private IExerciseService _ExerciseService;
        private ICategoryService _CategoryService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public ExercisesController(
            ICategoryService CategoryService,
            IExerciseService ExerciseService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _CategoryService = CategoryService;
            _ExerciseService = ExerciseService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }
        
        [AllowAnonymous]
        [HttpPost("create")]
        public ActionResult<Exercise> CreateExercise([FromForm] CreateExercise model)
        {
            //repair todo 
            var filesList = new List<byte[]>();
            
            //transform IFormFile List to byte[]
            if (model.Files != null)
            {
                foreach (var formFile in model.Files.Where(formFile => formFile.Length > 0))
                {
                    /*Compress(formFile);*/
                    using var memoryStream = new MemoryStream();
                    formFile.CopyTo(memoryStream);
                    filesList.Add(memoryStream.ToArray());
                }
            }

            var transformModel = new ExerciseModel
            {
                Name = model.Name,
                Description = model.Description,
                Files = filesList ,
                CategoryId = model.CategoryId
            };


            var exercise = _mapper.Map<Exercise>(transformModel);

            try
            {
                _CategoryService.AssignExercise(model.CategoryId, exercise);
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
            var exercises = _ExerciseService.GetAll();
            return Ok(exercises);
        }

        [AllowAnonymous]
        [HttpGet("category/{categoryId}")]
        public IActionResult GetExercisesByCategory(string categoryId)
        {
            var exercises = _ExerciseService.GetAllOfCategory(categoryId);

            if (exercises == null)
                return NotFound();

            return Ok(exercises);
        }

        [AllowAnonymous]
        [HttpGet("plan/{planId}")]
        public IActionResult GetExercisesByPlan(string planId)
        {
            var exercises = _ExerciseService.GetAllOfPlan(planId);

            if (exercises == null)
                return NotFound();

            return Ok(exercises);
        }


        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var exercise = _ExerciseService.GetById(id);

            if (exercise == null)
                return NotFound();

            return Ok(exercise);
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromForm] UpdateExerciseModel model)
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
                _ExerciseService.Update(exercise, id);
                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _ExerciseService.Delete(id);
            return Ok();
        }
    }
}
