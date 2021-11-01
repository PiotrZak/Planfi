using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace PlanfiApi.Controllers
{
    [Route("/")]
    [ApiController]
    public class HealthController : ControllerBase
    {

        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return Ok();
        }
    }
    
}