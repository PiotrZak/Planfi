using System;
using System.Collections.Generic;
using WebApi.Controllers.ViewModels;
using WebApi.Entities;

namespace WebApi.Data.Entities.Users
{
    public sealed class Trainer : User
    {
        public Trainer()
        {
            TrainerId = Guid.NewGuid().ToString();
            Avatar = new byte[] { 0x20, 0x20, 0x20, 0x20, 0x20, 0x20 };
            Plans = new List<Plan>();
            ClientsTrainers = new List<ClientsTrainers>();
        }

        public string TrainerId { get; set; }

        public List<Plan> Plans { get; set; }
        public ICollection<ClientsTrainers> ClientsTrainers { get; set; }
    }
}
