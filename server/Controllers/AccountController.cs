using System;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using WebApi.Models;
using System.IO;
using Microsoft.AspNetCore.Http;
using WebApi.Controllers.ViewModels;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly IAccountService _accountService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public AccountController(
            IEmailService emailService,
            IAccountService accountService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)

        {
            _accountService = accountService;
            _emailService = emailService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
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
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        [HttpPost("forgot")]
        public IActionResult ForgotPassword([FromBody] ForgotPassword forgotPasswordModel)
        {

            var user = _accountService.FindUserByEmail(forgotPasswordModel.Email);

            if (user == null) return;

            user.ResetToken = randomTokenString();
            user.ResetTokenExpires = DateTime.UtcNow.AddDays(1);

            _emailService.SendEmail(message);
        }

        private void sendVerificationEmail(Account account, string origin)
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

            _emailService.Send(
                ToAddresses: account.Email,
                FromAddresses: 
                subject: "Sign-up Verification API - Verify Email",
                Content: $@"<h4>Verify Email</h4>
                         <p>Thanks for registering!</p>
                         {message}"
            );
        }
        
    }
}
