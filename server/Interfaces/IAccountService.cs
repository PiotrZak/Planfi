using System;
using System.Threading.Tasks;
using WebApi.Controllers.ViewModels;
using WebApi.Data.Entities.Users;
using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IAccountService
    {
        Task<int> UploadAvatar(string userId, byte[] avatar);
        Task<bool> ForgotPassword(ForgotPassword model, string origin);
        Task<int> ResetPassword(ResetPasswordRequest model);
        Task<int> SendVerificationEmail(RegisterModel register, string origin);
        Task<User> Activate(ActivateAccount user);
    }
}