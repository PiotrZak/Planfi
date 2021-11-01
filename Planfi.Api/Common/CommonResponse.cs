using System.Linq;
using System.Net;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace PlanfiApi.Common
{
    [Authorize, ApiController, Produces("application/json"), Route("api/[controller]")]
    public abstract class ApiControllerBase : Controller
    {
        protected IActionResult CommonResponse(ApiCommonResponse result)
        {
            var response = new
            {
                status = result.Status.ToString(),
                statusCode = result.Status,
                data = result.Data,
                messages = result.Messages?.Select(x => new
                {
                    Type = x.Type.ToString(),
                    x.Text
                })
            };

            if (result.HasErrors || result.Status == HttpStatusCode.BadRequest)
            {
                return BadRequest(response);
            }

            return Ok(response);
        }
    }
}