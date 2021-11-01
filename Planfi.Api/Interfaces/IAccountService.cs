using System;
using System.Threading.Tasks;
using PlanfiApi.Controllers.ViewModels;
using PlanfiApi.Data.Entities.Users;
using PlanfiApi.Data.ViewModels;
using PlanfiApi.Models;
using PlanfiApi.Entities;

namespace PlanfiApi.Interfaces
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