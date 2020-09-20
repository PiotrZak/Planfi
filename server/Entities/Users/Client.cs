using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApi.Controllers.ViewModels;

namespace WebApi.Entities
{
    public class Client : User
    {
        public Client()
        {
            ClientId = Guid.NewGuid().ToString();
        }

        public string ClientId { get; set; }

        public List<Plan> Plans { get; set; }
        public virtual ICollection<ClientsPlans> ClientsPlans { get; set; }
        public virtual ICollection<ClientsTrainers> ClientsTrainers { get; set; }
    }
}
