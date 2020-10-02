using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Entities;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {
        private ICategoryService _CategoryService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
       
        public CategoryController(
            ICategoryService CategoryService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _CategoryService = CategoryService ;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("create")]
        public IActionResult Create([FromBody]CreateCategory model)
        {

            var Category = _mapper.Map<Category>(model);

            try
            {
                _CategoryService.Create(Category);
                return Ok(new
                {
                    Category.CategoryId,
                    Category.Title,
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

            var Category = _CategoryService.GetById(id);

            if (Category == null)
                return NotFound();

            return Ok(Category);
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll()
        {
            var Category = _CategoryService.GetAll();
            return Ok(Category);
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            _CategoryService.Delete(id);
            return Ok();
        }
    }
}
