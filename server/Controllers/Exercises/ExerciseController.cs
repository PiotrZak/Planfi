using System;
using Microsoft.AspNetCore.Mvc;
using WebApi.Entities;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using WebApi.Models;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.DependencyInjection;
using WebApi.Interfaces;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ExercisesController : ControllerBase
    {
        private readonly IExerciseService _ExerciseService;
        private readonly ICategoryService _CategoryService;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;
        private readonly IHostingEnvironment _environment;

        public ExercisesController(
            ICategoryService categoryService,
            IExerciseService exerciseService,
            IMapper mapper,
            IOptions<AppSettings> appSettings,
            IHostingEnvironment environment)
        {
            _CategoryService = categoryService;
            _ExerciseService = exerciseService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _environment = environment;
        }
        
        [AllowAnonymous]
        [HttpPost("create")]
        public async Task<IActionResult> CreateExercise([FromForm] CreateExercise model)
        {
            var transformModel = new ExerciseModel();
            //transform IFormFile List to byte[]
            if (model.Files != null)
            {
                var filesList = new List<byte[]>();
                foreach (var formFile in model.Files.Where(formFile => formFile.Length > 0))
                {
                    if (formFile.ContentType =="video/mp4" || formFile.ContentType == "video/mov" || formFile.ContentType == "video.avi")
                    {
                        
                        _environment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
                        var path = Path.Combine(_environment.WebRootPath, "Movies");
                            
                        if (!Directory.Exists(path))
                        {
                            Directory.CreateDirectory(path);
                        }
                        var fileName = Path.GetFileName(model.Name);
                        await using (var stream = new FileStream(Path.Combine(path, fileName), FileMode.Create))
                        {
                            await formFile.CopyToAsync(stream);
                        }
                    }
                    
                    /*Compress(formFile);*/
                    await using var memoryStream = new MemoryStream();
                    await formFile.CopyToAsync(memoryStream);
                    filesList.Add(memoryStream.ToArray());
                }
                transformModel.Name = model.Name;
                transformModel.Description = model.Description;
                transformModel.Files = filesList;
                transformModel.CategoryId = model.CategoryId;
            }
            else
            {
                transformModel.Name = model.Name;
                transformModel.Description = model.Description;
                transformModel.Files = null;
                transformModel.CategoryId = model.CategoryId;
            }
            
            var exercise = _mapper.Map<Exercise>(transformModel);
            try
            {
                await _CategoryService.AssignExercise(model.CategoryId, exercise);
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
        [HttpGet("organization/{organizationId}")]
        public async Task<IActionResult> GetAllByOrganization(string organizationId)
        {
            var exercises = await _ExerciseService.GetAllByOrganization(organizationId);
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
                await _ExerciseService.Update(exercise, id);
                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _ExerciseService.Delete(id);
            return Ok();
        }
    }
}
