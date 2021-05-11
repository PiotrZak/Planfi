using System;
using WebApi.Data.Entities.Users;

namespace WebApi.Entities
{
    public class Admin : User
    {
        public Admin()
        {
            AdminId = Guid.NewGuid().ToString();
        }

        public string AdminId { get; set; }

    }
}
