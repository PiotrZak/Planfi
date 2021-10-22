using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApi.Controllers.ViewModels;
using WebApi.Data.Entities.Users;
using WebApi.Data.ViewModels;
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
        private const string SenderName = "Planfi";
        private const string SenderEmail = "planfi.contact@gmail.com";

        public AccountService(IEmailService emailService, DataContext context, IUserService userService, IMapper mapper)
        {
            _emailService = emailService;
            _context = context;
            _userService = userService;
            _mapper = mapper;
        }
        
        public async Task<User> Activate(ActivateAccount user)
        {
            var selectedUser = _context.users.SingleOrDefault(x => x.VerificationToken == user.VerificationToken);

            if (selectedUser == null) throw new AppException();
            
            selectedUser.Avatar = null;
            selectedUser.Email = selectedUser.Email;
            selectedUser.Role = selectedUser.Role;
            selectedUser.PhoneNumber = user.PhoneNumber;
            selectedUser.FirstName = user.FirstName;
            selectedUser.LastName = user.LastName;
            selectedUser.PhoneNumber = user.PhoneNumber;

            _userService.CreatePasswordHash(user.Password, out var passwordHash, out var passwordSalt);

            selectedUser.Password = ExtensionMethods.EncryptPassword(user.Password);
            selectedUser.PasswordHash = passwordHash;
            selectedUser.PasswordSalt = passwordSalt;
            selectedUser.IsActivated = true;

            _context.users.Update(selectedUser);
            await _context.SaveChangesAsync();
            return selectedUser;
        }
        
        public async Task<bool> ForgotPassword(ForgotPassword model, string origin)
        {
            var user = _context.users.FirstOrDefault(x => x.Email == model.Email).WithoutPassword();

            if (user == null)
                throw new ValidationException(
                    $"Invalid mail");

            // create reset token that expires after 1 day
            user.ResetToken = RandomTokenString();
            user.ResetTokenExpires = DateTime.UtcNow.AddDays(1);
            
            SendPasswordResetEmail(user, origin);
            
            _context.users.Update(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<int>  UploadAvatar(string userId, byte[] avatar)
        {
            var user = await _context.users.FindAsync(userId);

            user.Avatar = avatar;
            _context.users.Update(user);
            await _context.SaveChangesAsync();
            return 1;
        }
        
        private void SendPasswordResetEmail(User account, string origin)
        {
            var resetPasswordMailUrl = $"{origin}/account/reset:{account.ResetToken}";
            const string resetPasswordMailTitle = "Reset password E-mail";
            var resetPasswordMailMessage = $@"<p>Please click the below link to reset your password, the link will be valid for 1 day:</p><p><a href=""{resetPasswordMailUrl}"">{resetPasswordMailUrl}</a></p>";
            
            
            var messageData = new EmailMessage
            {
                ToAddresses = new List<EmailMessage.EmailAddress>()
                {
                    new()
                    {
                        Name = account.Email,
                        Address = account.Email
                    }
                },
                FromAddresses = new List<EmailMessage.EmailAddress>()
                {
                    new()
                    {
                        Name = SenderName,
                        Address = SenderEmail,
                    }
                },
                Subject = resetPasswordMailTitle,
                Content = resetPasswordMailMessage,
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
                var user = _context.users.SingleOrDefault(x =>
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

                _context.users.Update(user);
                return await _context.SaveChangesAsync();
            }
            catch (ValidationException ex)
            {
                return 0;
            }
        }

        private async Task<int> ConstructMessage(User user, string origin)
        {
            var activationMailUrl = $"{origin}/account/activate:{user.VerificationToken}";
            const string activationMailTitle = "Activate Your Account";
            var activationMailMessage = $@"<h4>Activation</h4> <p>Thanks for registering!</p> <p>Please click the below link to verify your email address:</p><p><a href=""{activationMailUrl}"">{activationMailUrl}</a></p>";
            
            var messageData = new EmailMessage
            {
                ToAddresses = new List<EmailMessage.EmailAddress>()
                {
                    new()
                    {
                        Name = user.Email,
                        Address = user.Email,
                    }
                },
                FromAddresses = new List<EmailMessage.EmailAddress>()
                {
                    new()
                    {
                        Name = SenderName,
                        Address = SenderEmail,
                    }
                },
                Subject = activationMailTitle,
                Content = activationMailMessage,
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
            
            var userRole = await _context.role.FirstOrDefaultAsync(x => x.Name == "User");
            var trainerRole = await _context.role.FirstOrDefaultAsync(x => x.Name == "Trainer");
            
            try
            {
                foreach (var email in model.Emails)
                {
                    if (_context.users.Any(x => x.Email == email))
                        throw new AppException("Email \"" + email + "\" is already taken");
                    
                    var user = new User
                    {
                        UserId = Guid.NewGuid().ToString(),
                        Role = model.Role is "User" or "Trainer"
                            ? userRole
                            : new Role { Id = Guid.NewGuid().ToString(), Name = model.Role },
                        OrganizationId = model.OrganizationId,
                        Email = email,
                        VerificationToken = RandomTokenString(),
                    };
                    var result = await ConstructMessage(user, origin);
                    if (result == 1)
                    {
                        await _context.users.AddAsync(user);
                        await _context.SaveChangesAsync();
                    }
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


