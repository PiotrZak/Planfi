using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Helpers;
using Microsoft.AspNetCore.Authorization;
using WebApi.Models;
using System.IO;
using AutoMapper.Configuration;
using Microsoft.AspNetCore.Http;
using WebApi.Controllers.ViewModels;
using RegisterModel = WebApi.Models.RegisterModel;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly IAccountService _accountService;

        public AccountController(
            IEmailService emailService,
            IAccountService accountService)
        {
            _accountService = accountService;
            _emailService = emailService;
            }

        [AllowAnonymous]
        [HttpPost("sendMail")]
        public IActionResult SendEmail([FromBody] EmailMessage message)
        {

            _emailService.SendEmail(message);
            return Ok(message);
        }

        [AllowAnonymous]
        [HttpPost("uploadAvatar")]
        public IActionResult UploadAvatar([FromForm]string userId, IFormFile avatar)
        {

            using var memoryStream = new MemoryStream();
            avatar.CopyTo(memoryStream);
            memoryStream.ToArray();
            var Avatar = memoryStream.ToArray();

            try
            {
                _accountService.UploadAvatar(userId, Avatar);
                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(new {message = ex.Message});
            }
        }
        
        [AllowAnonymous]
        [HttpPost("forgot-password")]
        public IActionResult ForgotPassword(ForgotPassword model)
        {
            var result = _accountService.ForgotPassword(model, Request.Headers["origin"]);

            if (result)
            {
                return Ok(new { message = "Please check your email for password reset instructions" });
            }
            return Ok(new { message = "This User dont exist" });
        }
        
        [AllowAnonymous]
        [HttpPost("reset-password")]
        public IActionResult ResetPassword(ResetPasswordRequest model)
        {
            _accountService.ResetPassword(model);
            return Ok(new { message = "Password reset successful, you can now login" });
        }
        
        [AllowAnonymous]
        [HttpPost("activate")]
        public IActionResult RegisterAccount(RegisterModel model)
        {
            _accountService.SendVerificationEmail(model, Request.Headers["origin"]);
            return Ok(new { message = "Activation mail sent!" });
        }

    }
}
