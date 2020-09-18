using WebApi.Entities;

namespace WebApi.Controllers.ViewModels
{
    public class AssignPlansToUser
    {
        public string[] ClientIds { get; set; }
        public string[] PlanIds { get; set; }
    }

    public class UsersPlans
    {
        public string ClientId { get; set; }
        public Client Client { get; set; }

        public string PlanId { get; set; }
        public Plan Plan { get; set; }
    }
}
