using PlanfiApi.Data.Entities.Users;

namespace PlanfiApi.Data.ViewModels
{
    public class AssignUsersToTrainer
    {
        public AssignUsersToTrainer()
        {
            TrainerIds = System.Array.Empty<string>();
            UserIds = System.Array.Empty<string>();
        }
        public string[] TrainerIds { get; set; }
        public string[] UserIds { get; set; }
    }

    public class UsersTrainers
    {
        public string TrainerId { get; set; }
        public User Trainer { get; set; }
        public string ClientId { get; set; }
        public User Client { get; set; }
    }
}
