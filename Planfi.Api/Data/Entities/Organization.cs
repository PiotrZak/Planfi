using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using PlanfiApi.Data.Entities;
using PlanfiApi.Data.Entities.Users;
using WebApi.Data.Entities;
using WebApi.Data.Entities.Users;

namespace WebApi.Entities
{
    public class Organization
    {
        public Organization()
        {
            OrganizationId = Guid.NewGuid().ToString();
            Users = new List<User>();
            Plans = new List<Plan>();
            Categories = new List<Category>();
        }

        [Key]
        public string OrganizationId { get; set; }
        public string Name { get; set; }
        public List<User> Users { get; set; }
        public List<Plan> Plans { get; set; }
        public List<Category> Categories { get; set; }
    }
}
