using System;

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
