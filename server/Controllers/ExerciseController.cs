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
using System;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ExercisesController : ControllerBase
    {
        private IExerciseService _ExerciseService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public ExercisesController(
            IExerciseService ExerciseService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _ExerciseService = ExerciseService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("create")]
        public ActionResult<Exercise> CreateExercise([FromForm] CreateExercise model)
        {

            //transform IFormFile List to byte[]
            var FilesList = new List<byte[]>();
            foreach (var formFile in model.Files)
            {
                if (formFile.Length > 0)
                {
                    using var memoryStream = new MemoryStream();
                    formFile.CopyTo(memoryStream);
                    FilesList.Add(memoryStream.ToArray());
                }
            }

            var transformModel = new ExerciseModel
            {
                Name = model.Name,
                Description = model.Description,
                Times = model.Times,
                Series = model.Series,
                Files = FilesList
            };

            var Exercise = _mapper.Map<Exercise>(transformModel);

            try
            {
                _ExerciseService.Create(Exercise);
                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
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
        [HttpGet]
        public IActionResult GetAll()
        {
            var exercises = _ExerciseService.GetAll();
            return Ok(exercises);
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
