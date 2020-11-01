using System;
using System.Linq;
using WebApi.Controllers.ViewModels;
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
        private readonly UserService _userService;

        public AccountService(DataContext context, UserService userService)
        {
            _context = context;
            _userService = userService;
        }

        public User FindUserByEmail(string email)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == email);
            return user.WithoutPassword();
        }
        
        public void UploadAvatar(string userId, byte[] avatar)
        {
            var user = _context.Clients.Find(userId);

            user.Avatar = avatar;
            _context.Clients.Update(user);
            _context.SaveChanges();
        }
        
        public void ResetPassword(ResetPasswordRequest model)
        {
            var user = _context.Users.SingleOrDefault(x =>
                x.ResetToken == model.Token &&
                x.ResetTokenExpires > DateTime.UtcNow);

            if (user == null)
                throw new AppException("Invalid token");

            // update password and remove reset token
            byte[] passwordHash, passwordSalt;
            _userService.CreatePasswordHash(model.Password, out passwordHash, out passwordSalt);
            
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            
            user.PasswordReset = DateTime.UtcNow;
            user.ResetToken = null;
            user.ResetTokenExpires = null;

            _context.Users.Update(user);
            _context.SaveChanges();
        }
    }
}


