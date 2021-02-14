using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using WebApi.Models;
using WebApi.Controllers.ViewModels;
using WebApi.Entities;
using WebApi.Interfaces;

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

        [Authorize(Roles = Role.Admin)]
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

        [Authorize(Roles = Role.Admin)]
        [HttpGet]
        public IActionResult GetAll()
        {
            var organizations = _OrganizationService.GetAll();
            return Ok(organizations);
        }

        [Authorize(Roles = Role.Owner)]
        [HttpGet("users/{id}")]
        public IActionResult GetOrganizationUsers(string id)
        {
            var users = _OrganizationService.GetOrganizationUsers(id);
            return Ok(users);
        }

        [Authorize(Roles = Role.Owner)]
        [HttpGet("trainers/{id}")]
        public IActionResult GetOrganizationTrainers(string id)
        {
            var trainers = _OrganizationService.GetOrganizationTrainers(id);
            
            var mappedUsers = trainers.Select(i => new UserViewModel
                {
                    UserId = i.UserId,
                    Avatar = i.Avatar,
                    FirstName = i.FirstName,
                    LastName = i.LastName,
                    Role = i.Role,
                    Email = i.Email,
                    PhoneNumber = i.PhoneNumber,
                })
                .ToList();
            return Ok(mappedUsers);
        }

        [Authorize(Roles = Role.Trainer + "," + Role.Owner)]
        [HttpGet("clients/{id}")]
        public IActionResult GetOrganizationClients(string id)
        {
            var clients = _OrganizationService.GetOrganizationClients(id);
            
            var mappedUsers = clients.Select(i => new UserViewModel
                {
                    UserId = i.UserId,
                    Avatar = i.Avatar,
                    FirstName = i.FirstName,
                    LastName = i.LastName,
                    Role = i.Role,
                    Email = i.Email,
                    PhoneNumber = i.PhoneNumber,
                })
                .ToList();
            
            return Ok(mappedUsers);
        }

        [Authorize(Roles = Role.Admin + "," + Role.Owner)]
        [HttpGet("user/{id}")]
        public IActionResult GetUserById(string organizationId, [FromForm] string userId)
        {
            var user = _OrganizationService.GetUserById(organizationId, userId);

            var mappedUser = new UserViewModel
            {
                UserId = user.UserId,
                Avatar = user.Avatar,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = user.Role,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
            };
            return Ok(mappedUser);
        }

        [Authorize(Roles = Role.Owner)]
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var organization = _OrganizationService.GetById(id);
            return Ok(organization);
        }

        [Authorize(Roles = Role.Owner)]
        [HttpPost("role")]
        public IActionResult ChangeRole([FromBody]ChangeRole model)
        {
            _OrganizationService.ChangeRole(model.UserId, model.Role) ;
            return Ok();
        }


        [Authorize(Roles = Role.Admin)]
        [HttpPost("delete")]
        public IActionResult Delete([FromBody] string[] id)
        {
            _OrganizationService.Delete(id);
            return Ok();
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPost("assignUsers")]
        public IActionResult AssignUsersToOrganization([FromBody] AssignUsersToOrganization model)
        {
            _OrganizationService.AssignUsersToOrganization(model.OrganizationId, model.UserId);

            return Ok();
        }

    }
}
