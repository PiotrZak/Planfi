using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;

namespace WebApi.Helpers
{
    public static class ExtensionMethods
    {
        public static IEnumerable<Client> WithoutPasswords(this IEnumerable<Client> users) 
        {
            if (users == null) return null;
            return users.Select(x => x.WithoutPassword());
        }

        public static Client WithoutPassword(this Client user) 
        {
            if (user == null) return null;

            user.Password = null;
            user.PasswordHash = null;
            user.PasswordSalt = null;
            return user;
        }
    }
}