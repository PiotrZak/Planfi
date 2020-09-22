using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using WebApi.Models;
using WebApi.Controllers.ViewModels;
using WebApi.Entities;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class OrganizationController : ControllerBase
    {
        private readonly IOrganizationService _OrganizationService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public OrganizationController(
            IOrganizationService OrganizationService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)

        {
            _OrganizationService = OrganizationService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("create")]
        public IActionResult Create([FromBody]CreateOrganization model)
        {
            var organization = _mapper.Map<Organization>(model);
            try
            {
                _OrganizationService.Create(organization);
                return Ok(organization);
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
            var organizations = _OrganizationService.GetAll();
            return Ok(organizations);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var organization = _OrganizationService.GetById(id);
            return Ok(organization);
        }

        [AllowAnonymous]
        [HttpPost("delete")]
        public IActionResult Delete([FromBody] string[] id)
        {
            _OrganizationService.Delete(id);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("assignUsers")]
        public IActionResult AssignUsersToOrganization([FromBody] AssignUsersToOrganization model)
        {
            _OrganizationService.AssignUsersToOrganization(model.OrganizationId, model.UserId);

            return Ok();
        }

    }
}
