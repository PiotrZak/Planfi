using System;
using System.Collections.Generic;
using WebApi.Controllers.ViewModels;
using WebApi.Data.Entities.Users;

namespace WebApi.Entities
{
    public sealed class Client : User
    {
        public Client()
        {
            ClientId = Guid.NewGuid().ToString();
            ClientsPlans = new List<ClientsPlans>();
            ClientsTrainers = new List<ClientsTrainers>();
        }

        public string ClientId { get; set; }

        public List<Plan> Plans { get; set; }
        public ICollection<ClientsPlans> ClientsPlans { get; set; }
        public ICollection<ClientsTrainers> ClientsTrainers { get; set; }
    }
}
