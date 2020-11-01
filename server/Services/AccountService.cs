using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using WebApi.Controllers.ViewModels;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models;

namespace WebApi.Services
{
    public interface IAccountService
    {
        void UploadAvatar(string userId, byte[] avatar);
        void ForgotPassword(ForgotPassword model, string origin);
        void ResetPassword(ResetPasswordRequest model);
    }

    public class AccountService : IAccountService
    {
        private readonly IEmailService _emailService;
        private readonly DataContext _context;
        private readonly IUserService _userService;

        public AccountService(IEmailService emailService, DataContext context, IUserService userService)
        {
            _emailService = emailService;
            _context = context;
            _userService = userService;
        }
        
        public void ForgotPassword(ForgotPassword model, string origin)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == model.Email).WithoutPassword();

            if (user == null) return;

            user.ResetToken = randomTokenString();
            user.ResetTokenExpires = DateTime.UtcNow.AddDays(1);
            
            SendPasswordResetEmail(user, origin);
        }

        public void UploadAvatar(string userId, byte[] avatar)
        {
            var user = _context.Clients.Find(userId);

            user.Avatar = avatar;
            _context.Clients.Update(user);
            _context.SaveChanges();
        }
        
        private static string randomTokenString()
        {
            using var rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            var randomBytes = new byte[40];
            rngCryptoServiceProvider.GetBytes(randomBytes);
            // convert random bytes to hex string
            return BitConverter.ToString(randomBytes).Replace("-", "");
        }
        
        private void SendPasswordResetEmail(User account, string origin)
        {
            string message;
            if (!string.IsNullOrEmpty(origin))
            {
                var resetUrl = $"{origin}/account/reset-password?token={account.ResetToken}";
                message = $@"<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                             <p><a href=""{resetUrl}"">{resetUrl}</a></p>";
            }
            else
            {
                message = $@"<p>Please use the below token to reset your password with the <code>/accounts/reset-password</code> api route:</p>
                             <p><code>{account.ResetToken}</code></p>";
            }

            var messageData = new EmailMessage
            {
                ToAddresses = new List<EmailMessage.EmailAddress>()
                {
                    new EmailMessage.EmailAddress()
                    {
                        Name = account.Email,
                        Address = account.Email
                    }
                },
                FromAddresses = new List<EmailMessage.EmailAddress>()
                {
                    new EmailMessage.EmailAddress()
                    {
                        Name = "Planfi",
                        Address = "planfi.contact@gmail.com",
                    }
                },
                Subject = "Reset password E-mail",
                Content = message,
            };
            
            _emailService.Send(messageData);
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
        
        // 
        /*private void SendVerificationEmail(Account account, string origin)
        {
            string message;
            if (!string.IsNullOrEmpty(origin))
            {
                var verifyUrl = $"{origin}/account/verify-email?token={account.VerificationToken}";
                message = $@"<p>Please click the below link to verify your email address:</p>
                             <p><a href=""{verifyUrl}"">{verifyUrl}</a></p>";
            }
            else
            {
                message = $@"<p>Please use the below token to verify your email address with the <code>/accounts/verify-email</code> api route:</p>
                             <p><code>{account.VerificationToken}</code></p>";
            }

            _emailService.SendEmail(
                ToAddresses: account.Email,
                FromAddresses: 
                subject: "Sign-up Verification API - Verify Email",
                Content: $@"<h4>Verify Email</h4>
                         <p>Thanks for registering!</p>
                         {message}"
            ); 
                
            return Ok(message);
        }*/
    }
}


