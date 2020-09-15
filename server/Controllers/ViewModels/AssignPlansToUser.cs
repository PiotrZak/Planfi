using System.ComponentModel.DataAnnotations.Schema;
using WebApi.Entities;

namespace WebApi.Controllers.ViewModels
{
    public class AssignPlansToUser
    {
        public string[] UserIds { get; set; }
        public string[] PlanIds { get; set; }
    }

    public class UsersPlans
    {
        public string UserId { get; set; }
        public User User { get; set; }

        public string PlanId { get; set; }
        public Plan Plan { get; set; }
    }
}
