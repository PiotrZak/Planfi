using System;
using WebApi.Data.Entities.Users;

namespace WebApi.Entities
{
    public class Owner : User
    {
        public Owner()
        {
            OwnerId = Guid.NewGuid().ToString();
        }

        public string OwnerId { get; set; }

    }
}
