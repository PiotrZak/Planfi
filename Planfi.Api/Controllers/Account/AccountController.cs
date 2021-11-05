using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PlanfiApi.Interfaces;
using WebApi.Common;
using WebApi.Controllers.ViewModels;
using WebApi.Data.ViewModels;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.Services.Account;

namespace PlanfiApi.Controllers.Account
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ApiControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly IAccountService _accountService;
        private readonly IUserService _userService;

        public AccountController(
            IEmailService emailService,
            IAccountService accountService, IUserService userService)
        {
            _accountService = accountService;
            _userService = userService;
            _emailService = emailService;
            }

        [AllowAnonymous]
        [HttpPost("sendMail")]
        public async Task<IActionResult> SendEmail([FromBody] EmailMessage message)
        {
            await _emailService.SendEmail(message);
            return Ok(message);
        }
        
        [AllowAnonymous]
        [HttpPost("gmailSignUp")]
        public async Task<IActionResult> GmailSignUp([FromBody] RegisterModel model)
        {
            try
            {
                var user = await _userService.GetUserWithoutPassword(model.Emails[0]);
                if (user != null)
                {
                    var success = ApiCommonResponse.Create()
                        .WithSuccess()
                        .WithData(user)
                        .Build();
                    return CommonResponse(success);
                }
            }
            catch(Exception e)
            {
                var failure = ApiCommonResponse.Create()
                    .WithFailure()
                    .WithData(e)
                    .Build();
                
                return CommonResponse(failure);
            }

            return null;
        }

        [AllowAnonymous]
        [HttpPost("uploadAvatar")]
        public async Task<IActionResult> UploadAvatar([FromForm]string userId, IFormFile avatar)
        {
            await using var memoryStream = new MemoryStream();
            await avatar.CopyToAsync(memoryStream);
            memoryStream.ToArray();
            var avatarBytes = memoryStream.ToArray();

            try
            {
                await _accountService.UploadAvatar(userId, avatarBytes);
                return Ok();
            }
            catch (AppException ex)
            {
                return BadRequest(new {message = ex.Message});
            }
        }
        
        [AllowAnonymous]
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPassword model)
        {
            try
            {
                var result = await _accountService.ForgotPassword(model, Request.Headers["origin"]);
                return Ok(new { message = "Please check your email for password reset instructions" });
            }
            catch
            {
                return Ok(new { message = "This User dont exist" });
            }
        }
        
        [AllowAnonymous]
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequest model)
        {
            try
            {
                var resetPasswordResponse = await _accountService.ResetPassword(model);
                
                var success = ApiCommonResponse.Create()
                    .WithSuccess()
                    .WithData(resetPasswordResponse)
                    .Build();
                
                return CommonResponse(success);
            }

            catch(Exception e)
            {
                var failure = ApiCommonResponse.Create()
                    .WithFailure()
                    .Build();
                
                return CommonResponse(failure);
            }
        }
        

        [AllowAnonymous]
        [HttpPost("invite")]
        public async Task<IActionResult> RegisterAccount(RegisterModel model)
        {

            try
            {
                var sendVerificationResponse = await _accountService.SendVerificationEmail(model, Request.Headers["origin"]);
                
                var success = ApiCommonResponse.Create()
                    .WithSuccess()
                    .WithData(sendVerificationResponse)
                    .Build();
                
                return CommonResponse(success);
            }

            catch(Exception e)
            {
                var failure = ApiCommonResponse.Create()
                    .WithFailure()
                    .WithData(e)
                    .Build();
                
                return CommonResponse(failure);
            }
        }
        
        [AllowAnonymous]
        [HttpPost("activate")]
        public async Task<IActionResult> ActivateAccount(ActivateAccount model)
        {
            var user = await _accountService.Activate(model);

            return Ok(user);
        }

    }
}
