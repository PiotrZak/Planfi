using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using AutoMapper;
using WebApi.Controllers.ViewModels;
using WebApi.Data.Entities.Users;
using WebApi.Data.ViewModels;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Services.Account
{
    public class AccountService : IAccountService
    {
        private readonly IEmailService _emailService;
        private readonly DataContext _context;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public AccountService(IEmailService emailService, DataContext context, IUserService userService, IMapper mapper)
        {
            _emailService = emailService;
            _context = context;
            _userService = userService;
            _mapper = mapper;
        }
        
        public async Task<User> Activate(ActivateAccount user)
        {
            var selectedUser = _context.Users.SingleOrDefault(x => x.VerificationToken == user.VerificationToken);

            if (selectedUser == null) throw new AppException();
            
            selectedUser.Avatar = null;
            selectedUser.Email = selectedUser.Email;
            selectedUser.Role = selectedUser.Role;
            selectedUser.PhoneNumber = user.PhoneNumber;
            selectedUser.FirstName = user.FirstName;
            selectedUser.LastName = user.LastName;
            selectedUser.PhoneNumber = user.PhoneNumber;

            _userService.CreatePasswordHash(user.Password, out var passwordHash, out var passwordSalt);

            selectedUser.Password = user.Password;
            selectedUser.PasswordHash = passwordHash;
            selectedUser.PasswordSalt = passwordSalt;
            selectedUser.IsActivated = true;

            _context.Users.Update(selectedUser);
            await _context.SaveChangesAsync();
            return selectedUser;
        }
        
        public async Task<bool> ForgotPassword(ForgotPassword model, string origin)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == model.Email).WithoutPassword();

            if (user == null) return false;

            // create reset token that expires after 1 day
            user.ResetToken = RandomTokenString();
            user.ResetTokenExpires = DateTime.UtcNow.AddDays(1);
            
            SendPasswordResetEmail(user, origin);
            
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<int>  UploadAvatar(string userId, byte[] avatar)
        {
            var user = await _context.Users.FindAsync(userId);

            user.Avatar = avatar;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return 1;
        }
        
        private void SendPasswordResetEmail(User account, string origin)
        {
            string message;
            if (!string.IsNullOrEmpty(origin))
            {
                var resetUrl = $"{origin}/account/reset:{account.ResetToken}";
                message = $@"<p>Please click the below link to reset your password, the link will be valid for 1 day:</p>
                             <p><a href=""{resetUrl}"">{resetUrl}</a></p>";
            }
            else
            {
                message = $@"<p>Please use the below token to reset your password with the <code>/account/forgot</code> api route:</p>
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

        private static string RandomTokenString()
        {
            using var rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            var randomBytes = new byte[40];
            rngCryptoServiceProvider.GetBytes(randomBytes);
            return BitConverter.ToString(randomBytes).Replace("-", "");
        }
        
        public async Task<int> ResetPassword(ResetPasswordRequest model)
        {
            try
            {
                var user = _context.Users.SingleOrDefault(x =>
                    x.ResetToken == model.Token);

                if (user == null)
                    throw new AppException("Invalid token");

                // update password and remove reset token
                _userService.CreatePasswordHash(model.Password, out var passwordHash, out var passwordSalt);
                
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                
                user.PasswordReset = DateTime.UtcNow.ToUniversalTime();
                user.ResetToken = null;
                user.ResetTokenExpires = null;

                _context.Users.Update(user);
                return await _context.SaveChangesAsync();
            }
            catch (ValidationException ex)
            {
                return 0;
            }
        }

        private async Task<int> ConstructMessage(User user, string origin)
        {
            string message;
            if (!string.IsNullOrEmpty(origin))
            {
                //todo - port
                var verifyUrl = $"{origin}/account/activate:{user.VerificationToken}";
                message = $@"<p>Please click the below link to verify your email address:</p>
                                 <p><a href=""{verifyUrl}"">{verifyUrl}</a></p>";
            }
            else
            {
                message =
                    $@"<p>Please use the below token to verify your email address with the <code>/accounts/verify-email</code> api route:</p>
                                 <p><code>{user.VerificationToken}</code></p>";
            }

            var messageData = new EmailMessage
            {
                ToAddresses = new List<EmailMessage.EmailAddress>()
                {
                    new EmailMessage.EmailAddress()
                    {
                        Name = user.Email,
                        Address = user.Email,
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
                Subject = "Activate Your Account",
                Content = $@"<h4>Activation</h4>
                        <p>Thanks for registering!</p>
                             {message}",
            };
            try
            {
                await _emailService.Send(messageData);
                return 1;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }


        }
        
        public async Task<int> SendVerificationEmail(RegisterModel model, string origin)
        {
            try
            {
                foreach (var email in model.Emails)
                {
                    if (_context.Users.Any(x => x.Email == email))
                        throw new AppException("Email \"" + email + "\" is already taken");
                    
                    var user = new User
                    {
                        Role = new Role { Name = model.Role },
                        OrganizationId = model.OrganizationId,
                        Email = email,
                        VerificationToken = RandomTokenString(),
                    };
                    var result = await ConstructMessage(user, origin);
                    if (result == 1)
                    {
                        await _context.Users.AddAsync(user);
                        await _context.SaveChangesAsync();
                    }
                    break;
                }
                
                return 1;
            }
            catch(Exception e)
            {
                //todo logging
                return await Task.FromException<int>(e);
            }
        }
    }
}


