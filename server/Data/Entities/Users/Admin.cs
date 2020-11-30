using System;

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
