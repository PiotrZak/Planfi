using PlanfiApi.Data.Entities;
using PlanfiApi.Data.Entities.Users;

namespace PlanfiApi.Data.Entities
{
    public class UsersPlans
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public string PlanId { get; set; }
        public Plan Plan { get; set; }
    }
}