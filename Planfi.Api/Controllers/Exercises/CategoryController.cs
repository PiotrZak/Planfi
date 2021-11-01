using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlanfiApi.Entities;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using PlanfiApi.Common;
using PlanfiApi.Data.Entities;
using PlanfiApi.Data.ViewModels;
using PlanfiApi.Helpers;
using PlanfiApi.Interfaces;
using PlanfiApi.Models;
using PlanfiApi.Controllers.ViewModels;

namespace PlanfiApi.Controllers
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

            var Category = _categoryService.GetById(id);

            if (Category == null)
                return NotFound();

            return Ok(Category);
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
        public IActionResult Delete([FromBody] string[] id)
        {
            _categoryService.Delete(id);
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
