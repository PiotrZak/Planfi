using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Http;

namespace PlanfiApi.Middlewares
{
    
    public class Claims
    {
        public const string UserId = "UserId";
    }
    
   public class GetUserContextMiddleware
    {
        private readonly RequestDelegate _next;

        public GetUserContextMiddleware(RequestDelegate next, string connectionString)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            var claims = new List<Claim>();
            
            httpContext = new HttpContextAccessor().HttpContext;
            var userId = httpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            claims.Add(new Claim("UserId", userId));
            claims.Add(new Claim(Claims.UserId, userId));
            
            // var userRoles = await GetUserRoles(userId);
            // claims.AddRange(userRoles.Select(userRole => new Claim("Role", userRole)));

            httpContext.User?.AddIdentity(new ClaimsIdentity(claims));

            await _next(httpContext);
        }
        
        // add roles to claims?
        // private async Task GetUserRoles(int userId)
        // {
        //     //dapper query
        //     var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
        //     await connection.OpenAsync();
        //     
        //     var users = await connection.QueryAsync<OrganizationService.UserSqlProjection>(
        //         @"SELECT 
        //         u.user_id, 
        //         "
        //     );
        //     
        //     return users.ToList();
        // }
    }
}