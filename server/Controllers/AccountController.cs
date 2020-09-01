using Microsoft.AspNetCore.Mvc;
using WebApi.Services;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;

using AutoMapper;
using System.Collections.Generic;
using System;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private IEmailService _EmailService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public AccountController(
            IEmailService EmailService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)

        {
            _EmailService = EmailService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult SendEmail([FromBody] EmailMessage message)
        {

            _EmailService.SendEmail(message);
            return Ok(message);
        }

    }
}
