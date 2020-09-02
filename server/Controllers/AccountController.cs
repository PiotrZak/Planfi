using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using WebApi.Models;
using System.Threading.Tasks;
using WebApi.Controllers.ViewModels;
using Microsoft.AspNetCore.Identity;
using WebApi.Entities;
using System.Collections.Generic;

using static WebApi.Models.EmailMessage;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IEmailService _EmailService;
        private IMapper _mapper;
        private UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly AppSettings _appSettings;

        public AccountController(
            IEmailService EmailService,
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IMapper mapper,
            IOptions<AppSettings> appSettings)

        {
            _EmailService = EmailService;
            _mapper = mapper;
            _userManager = userManager;
            _signInManager = signInManager;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("sendMail")]
        public IActionResult SendEmail([FromBody] EmailMessage message)
        {

            _EmailService.SendEmail(message);
            return Ok(message);
        }

        [AllowAnonymous]
        [HttpPost("forgot")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ForgotPasswordAsync([FromBody] ForgotPassword forgotPasswordModel)
        {

            var user = await _userManager.FindByEmailAsync(forgotPasswordModel.Email);
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var callback = Url.Action(nameof(ResetPassword), nameof(AccountController), new { token, email = user.Email }, Request.Scheme);


            var message = new EmailMessage
            { 
              ToAddresses = new List<EmailAddress>()
              {
                 new EmailAddress()
                 {
                     Name = "Test",
                     Address = "test@gmail.com"
                 }
              },
              FromAddresses = new List<EmailAddress>()
              {
                 new EmailAddress()
                 {
                     Name = "Test",
                     Address = "test@gmail.com"
                 }
              },
            
                Subject = "Reset password token",
                Content = "test",
            };


            _EmailService.SendEmail(message);
            return Ok(message);
        }

        [AllowAnonymous]
        [HttpPost("resetpassword")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPasswordModel resetPasswordModel)
        {

            var user = await _userManager.FindByEmailAsync(resetPasswordModel.Email);


            var resetPassResult = await _userManager.ResetPasswordAsync(user, resetPasswordModel.Token, resetPasswordModel.Password);

            if (!resetPassResult.Succeeded)
            {
                foreach (var error in resetPassResult.Errors)
                {
                    ModelState.TryAddModelError(error.Code, error.Description);
                }
                return Ok("Error");
            }
            return Ok("Password reset completed!");
        }
    }
}
