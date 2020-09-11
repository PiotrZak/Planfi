using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IAccountService
    {
        void UploadAvatar(string userId, byte[] avatar);
    }

    public class AccountService : IAccountService
    {
        private readonly DataContext _context;

        public AccountService(DataContext context)
        {
            _context = context;
        }

        public void UploadAvatar(string userId, byte[] avatar)
        {
            var user = _context.Users.Find(userId);

            user.Avatar = avatar;
            _context.Users.Update(user);
            _context.SaveChanges();
        }
    }
}


