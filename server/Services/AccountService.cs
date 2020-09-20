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
        User FindUserByEmail(string email);
        //User ResetPassword(Client user, string token, string password);
    }

    public class AccountService : IAccountService
    {
        private readonly DataContext _context;

        public AccountService(DataContext context)
        {
            _context = context;
        }

        public User FindUserByEmail(string email)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == email);
            return user.WithoutPassword();
        }

        //public User ResetPassword(User user, string token, string password)
        //{
        //    // todo - implement method

        //    //byte[] passwordHash, passwordSalt;
        //    //CreatePasswordHash(password, out passwordHash, out passwordSalt);

        //    //user.PasswordHash = passwordHash;
        //    //user.PasswordSalt = passwordSalt;

        //    //_context.Users.Update(user);
        //    //_context.SaveChanges();

        //    return user;
        //}


        public void UploadAvatar(string userId, byte[] avatar)
        {
            var user = _context.Clients.Find(userId);

            user.Avatar = avatar;
            _context.Clients.Update(user);
            _context.SaveChanges();
        }
    }
}


