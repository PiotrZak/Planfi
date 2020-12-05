using System;
using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Helpers;
using Microsoft.AspNetCore.Authorization;
using WebApi.Models;
using System.IO;
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
            try
            {
                var resetPasswordResponse = _accountService.ResetPassword(model);
                
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
        public IActionResult RegisterAccount(RegisterModel model)
        {
            try
            {
                var sendVerificationResponse = _accountService.SendVerificationEmail(model, Request.Headers["origin"]);
                
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
                    .Build();
                
                return CommonResponse(failure);
            }
        }
        
        [AllowAnonymous]
        [HttpPost("activate")]
        public IActionResult ActivateAccount(ActivateAccount model)
        {
            var user = _accountService.Activate(model);

            return Ok(user);
        }

    }
}
