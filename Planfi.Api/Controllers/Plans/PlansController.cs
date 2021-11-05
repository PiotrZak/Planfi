using Microsoft.AspNetCore.Mvc;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using WebApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PlanfiApi.Data.ViewModels;
using PlanfiApi.Interfaces;
using WebApi.Data.Entities;
using WebApi.Interfaces;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PlansController : ControllerBase
    {
        private IPlanService _planService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;
       
        public PlansController(
            IPlanService planService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _planService = planService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody]CreatePlan model)
        {
            var plan =  _mapper.Map<Plan>(model);

            try
            {
                await _planService.Create(plan);
                return Ok(new
                {
                    plan.PlanId,
                    plan.Title,
                    plan.CreatorId,
                    plan.CreatorName,
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
            var plan = _planService.GetById(id);

            if (plan == null)
                return NotFound();

            return Ok(plan);
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id,[FromForm]string title)
        {
            try
            {
                await _planService.Update(id, title);
                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("assignExercises")]
        public IActionResult AssignToPlan([FromBody]AssignExerciseToPlan model)
        {
            _planService.AssignExercisesToPlan(model.PlanId, model.ExerciseId, model.ExerciseModel);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("unassignExercises")]
        public IActionResult UnassignToPlan([FromBody] UnAssignExerciseToPlan model)
        {
            _planService.UnassignExercisesToPlan(model.PlanId, model.ExerciseId);
            return Ok();
        }

        [AllowAnonymous]
        [HttpGet("organizationsplan/{id}")]
        public IActionResult GetOrganizationPlans(string id)
        {
            var plans = _planService.GetOrganizationPlans(id);

            if (plans == null)
                return NotFound();

            // Convert it to the DTO
            var transformedPlans = _mapper.Map<List<Plan>, List<ResultPlan>>(plans.ToList());

            return Ok(transformedPlans);
        }

        [AllowAnonymous]
        [HttpGet("usersplan/{id}")]
        public async Task<IActionResult> GetUserPlans(string id)
        {
            var plans = await _planService.GetUserPlans(id);

            if (plans == null)
                return NotFound();
            
            return Ok(plans);
        }

        [AllowAnonymous]
        [HttpGet("trainerplans/{id}")]
        public IActionResult GetCreatorPlans(string id)
        {
            var plans = _planService.GetCreatorPlans(id);

            if (plans == null)
                return NotFound();

            return Ok(plans);
        }


        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll()
        {
            var plans = _planService.GetAll();
            return Ok(plans);
        }

        [AllowAnonymous]
        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromBody] string[] id)
        {
            await _planService.Delete(id);
            return Ok();
        }

    }
}
