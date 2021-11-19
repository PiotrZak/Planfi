using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PlanfiApi.Data.Entities;
using PlanfiApi.Data.ViewModels;
using PlanfiApi.Interfaces;
using WebApi.Common;
using WebApi.Controllers.ViewModels;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Models;

namespace PlanfiApi.Controllers.Exercises
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ApiControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;
       
        public CategoryController(
            ICategoryService categoryService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _categoryService = categoryService ;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("create")]
        public IActionResult Create([FromBody]CreateCategory model)
        {

            var category = _mapper.Map<Category>(model);

            try
            {
                _categoryService.Create(category);
                return Ok(new
                {
                    category.CategoryId,
                    category.Title,
                });
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
            var category = _categoryService.GetById(id);
            return Ok(category);
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll()
        {
            var category = _categoryService.GetAll();
            return Ok(category);
        }
        
        [AllowAnonymous]
        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromBody] string[] id)
        {
            await _categoryService.Delete(id);
            return Ok();
        }
        
        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, UpdateCategoryModel model)
        {
            try
            {
                var categoryResponse = await _categoryService.Update(model, id);
                
                var success = ApiCommonResponse.Create()
                    .WithSuccess()
                    .WithData(categoryResponse)
                    .Build();
                
                return CommonResponse(success);
            }

            catch(Exception e)
            {
                var failure = ApiCommonResponse.Create()
                    .WithFailure()
                    .Build();
                return CommonResponse(failure);
            }
        }

        [AllowAnonymous]
        [HttpPost("assignExercises")]
        public IActionResult AssignExercisesToCategory([FromBody]AssignExercisesToCategory model)
        {
            _categoryService.AssignExercisesToCategory(model.CategoryId, model.ExerciseId);
            return Ok();
        }
    }
}
