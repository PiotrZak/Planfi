using System;
using System.Collections.Generic;
using WebApi.Controllers.ViewModels;

namespace WebApi.Entities
{
    public class Trainer : User
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
        public virtual ICollection<ClientsTrainers> ClientsTrainers { get; set; }
    }
}
