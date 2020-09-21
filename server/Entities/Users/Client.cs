using System;
using System.Collections.Generic;
using WebApi.Controllers.ViewModels;

namespace WebApi.Entities
{
    public class Client : User
    {
        public Client()
        {
            ClientId = Guid.NewGuid().ToString();
            ClientsPlans = new List<ClientsPlans>();
            ClientsTrainers = new List<ClientsTrainers>();
        }

        public string ClientId { get; set; }

        public List<Plan> Plans { get; set; }
        public virtual ICollection<ClientsPlans> ClientsPlans { get; set; }
        public virtual ICollection<ClientsTrainers> ClientsTrainers { get; set; }
    }
}
