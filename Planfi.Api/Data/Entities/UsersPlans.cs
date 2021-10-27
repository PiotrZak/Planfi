using WebApi.Data.Entities.Users;

namespace WebApi.Data.Entities
{
    public class UsersPlans
    {
        public string UserId { get; set; }
        public User User { get; set; }
        public string PlanId { get; set; }
        public Plan Plan { get; set; }
    }
}