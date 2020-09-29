using System;
using WebApi.Entities;

namespace WebApi.Controllers.ViewModels
{
    public class AssignPlansToClient
    {
        public AssignPlansToClient()
        {
            ClientIds = new string[] { };
            PlanIds = new string[] { };
        }

        public string[] ClientIds { get; set; }
        public string[] PlanIds { get; set; }
    }

    public class ClientsPlans
    {
        public string ClientId { get; set; }
        public Client Client { get; set; }

        public string PlanId { get; set; }
        public Plan Plan { get; set; }
    }
}
