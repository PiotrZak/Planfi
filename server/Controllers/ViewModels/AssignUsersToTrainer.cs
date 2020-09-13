using System;
namespace WebApi.Controllers.ViewModels
{
    public class AssignUsersToTrainer
    {
        public string TrainerId { get; set; }
        public string[] UsersId { get; set; }
    }
}
