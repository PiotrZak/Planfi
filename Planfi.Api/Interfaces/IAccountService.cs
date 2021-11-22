using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using PlanfiApi.Data.Entities.Users;
using PlanfiApi.Models;
using WebApi.Controllers.ViewModels;
using WebApi.Data.ViewModels;
using WebApi.Models;

namespace PlanfiApi.Interfaces
{
    public interface IAccountService
    {
        Task<int> UploadAvatar(byte[] avatar, string? userId);
        Task<int> ProcessAvatar(IFormFile avatar, string? UserId);
        Task<bool> ForgotPassword(ForgotPassword model, string origin);
        Task<int> ResetPassword(ResetPasswordRequest model);
        Task<int> SendVerificationEmail(RegisterModel register, string origin);
        Task<User> Activate(ActivateAccount user);
    }
}
