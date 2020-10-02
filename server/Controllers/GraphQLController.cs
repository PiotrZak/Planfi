using System.Threading.Tasks;
using GraphQL;
using GraphQL.Types;
using GraphQL.SystemTextJson;
using GraphQL.NewtonsoftJson;
using Microsoft.AspNetCore.Mvc;
using WebApi.Entities.GraphQl;
using WebApi.Helpers;
using Newtonsoft.Json;

namespace WebApi.Controllers
{
    [Route("graphql")]
    [ApiController]
    public class GraphQLController : Controller
    {
        private readonly DataContext _db;

        public GraphQLController(DataContext db) => _db = db;

        public async Task<IActionResult> Post([FromBody] GraphQLQuery query)
        {

            var inputs = query.Variables.ToInputs();

            var schema = new Schema
            {
                Query = new CategoryQuery(_db)
            };

            var result = await new DocumentExecuter().ExecuteAsync(_ =>
            {
                _.Schema = schema;
                _.Query = query.Query;
                _.OperationName = query.OperationName;
                _.Inputs = inputs;
            });

            if (result.Errors?.Count > 0)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }

}