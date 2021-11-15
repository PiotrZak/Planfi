using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PlanfiApi.Data.Entities;
using PlanfiApi.Data.Entities.Users;
using PlanfiApi.Data.ViewModels;
using PlanfiApi.Interfaces;
using PlanfiApi.Models.ViewModels;
using WebApi.Controllers.ViewModels;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models;

namespace PlanfiApi.Controllers.Organizations
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class OrganizationController : ControllerBase
    {
        private readonly IOrganizationService _organizationService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public OrganizationController(
            IOrganizationService organizationService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)

        {
            _organizationService = organizationService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [Authorize(Roles = PossibleRoles.Admin)]
        [HttpPost("create")]
        public IActionResult Create([FromBody]CreateOrganization model)
        {
            var organization = _mapper.Map<Organization>(model);
            try
            {
                _organizationService.Create(organization);
                return Ok(organization);
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [Authorize(Roles = PossibleRoles.Admin)]
        [HttpGet]
        public IActionResult GetAll()
        {
            var organizations = _organizationService.GetAll();
            return Ok(organizations);
        }

        [Authorize(Roles = PossibleRoles.Owner)]
        [HttpGet("users/{id}")]
        public IActionResult GetOrganizationUsers(string id)
        {
            var users = _organizationService.GetOrganizationUsers(id);
            return Ok(users);
        }

        [Authorize(Roles = PossibleRoles.Owner)]
        [HttpGet("trainers/{id}")]
        public IActionResult GetOrganizationTrainers(string id)
        {
            var trainers = _organizationService.GetOrganizationTrainers(id);
            
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

        [Authorize(Roles = PossibleRoles.Trainer + "," + PossibleRoles.Owner)]
        [HttpGet("clients/{id}")]
        public IActionResult GetOrganizationClients(string id)
        {
            var clients = _organizationService.GetOrganizationClients(id);
            
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

        [Authorize(Roles = PossibleRoles.Admin + "," + PossibleRoles.Owner)]
        [HttpGet("user/{id}")]
        public IActionResult GetUserById(string organizationId, [FromForm] string userId)
        {
            var user = _organizationService.GetUserById(organizationId, userId);

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

        [Authorize(Roles = PossibleRoles.Owner)]
        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var organization = _organizationService.GetById(id);
            return Ok(organization);
        }

        [Authorize(Roles = PossibleRoles.Owner)]
        [HttpPost("role")]
        public IActionResult ChangeRole([FromBody]ChangeRole model)
        {
            _organizationService.ChangeRole(model.UserId, model.Role) ;
            return Ok();
        }


        [Authorize(Roles = PossibleRoles.Admin)]
        [HttpPost("delete")]
        public IActionResult Delete([FromBody] string[] id)
        {
            _organizationService.Delete(id);
            return Ok();
        }

        [Authorize(Roles = PossibleRoles.Admin)]
        [HttpPost("assignUsers")]
        public IActionResult AssignUsersToOrganization([FromBody] AssignUsersToOrganization model)
        {
            _organizationService.AssignUsersToOrganization(model.OrganizationId, model.UserId);

            return Ok();
        }

    }
}
