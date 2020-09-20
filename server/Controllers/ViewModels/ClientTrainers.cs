using WebApi.Entities;

namespace WebApi.Controllers.ViewModels
{
    public class AssignUsersToTrainer
    {
        public string[] TrainerIds { get; set; }
        public string[] UserIds { get; set; }
    }

    public class ClientsTrainers
    {
        public string TrainerId { get; set; }
        public Trainer Trainer { get; set; }

        public string ClientId { get; set; }
        public Client Client { get; set; }
    }
}
