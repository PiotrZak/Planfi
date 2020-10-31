using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using WebApi.Models;
using Microsoft.AspNetCore.Identity;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using WebApi.Controllers.ViewModels;
using static WebApi.Models.EmailMessage;
using System.Collections.Generic;

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
            
            var message = new EmailMessage
            {
                ToAddresses = new List<EmailAddress>()
              {
                 new EmailAddress()
                 {
                     Name = "Test",
                     Address = forgotPasswordModel.Email
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


            _emailService.SendEmail(message);
            return Ok(message);
        }
    }
}
