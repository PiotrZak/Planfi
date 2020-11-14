using System;
using System.Threading.Tasks;
using WebApi.Controllers.ViewModels;
using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IAccountService
    {
        void UploadAvatar(string userId, byte[] avatar);
        Boolean ForgotPassword(ForgotPassword model, string origin);
        Task<int> ResetPassword(ResetPasswordRequest model);
        Task<int> SendVerificationEmail(RegisterModel register, string origin);
        User Activate(ActivateAccount user);
    }
}