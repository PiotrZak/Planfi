using System;
namespace WebApi.Controllers.ViewModels
{
    public class AssignPlansToUser
    {
        public string UserId { get; set; }
        public string[] PlanId { get; set; }
    }
}
