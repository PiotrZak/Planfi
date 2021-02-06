using System;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Helpers;
using Microsoft.AspNetCore.Authorization;
using WebApi.Models;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using WebApi.Common;
using WebApi.Controllers.ViewModels;
using WebApi.Interfaces;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ApiControllerBase
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
        public async Task<IActionResult> SendEmail([FromBody] EmailMessage message)
        {
            await _emailService.SendEmail(message);
            return Ok(message);
        }

        [AllowAnonymous]
        [HttpPost("uploadAvatar")]
        public async Task<IActionResult> UploadAvatar([FromForm]string userId, IFormFile avatar)
        {

            using var memoryStream = new MemoryStream();
            avatar.CopyTo(memoryStream);
            memoryStream.ToArray();
            var Avatar = memoryStream.ToArray();

            try
            {
                await _accountService.UploadAvatar(userId, Avatar);
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
                
                return Ok(new { message = "ok" });
                /*return CommonResponse(success);*/
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
