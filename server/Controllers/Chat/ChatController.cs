using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.Common;
using WebApi.Data.Entities.Users;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.Services.Chat;

namespace WebApi.Controllers.Chat
{
    [Microsoft.AspNetCore.Components.Route("api/[controller]")]
    public class ChatController : ApiControllerBase
    {
        private readonly IChatService _chatService;

        public ChatController(IChatService chatService)
        {
            _chatService = chatService;
        }
        // GET: api/<controller>
        [HttpGet("[action]")]
        public IEnumerable<User> LoggedOnUsers()
        {
            return new[]
            {
                new User
                {
                    OrganizationId = "O1",
                    UserId = "u1",
                    Avatar = null,
                    FirstName = "Teodoor",
                    LastName = "Gianelli",
                    Email = "tgianelli0@eventbrite.com",
                    PhoneNumber = "555555555",
                    Password = "Teodor",
                    PasswordHash = null,
                    PasswordSalt = null,
                    Token = "t-user",
                    IsActivated = true,
                },
                new User
                {
                    OrganizationId = "O2",
                    UserId = "o2u1",
                    Avatar = null,
                    FirstName = "Jacklyn",
                    LastName = "Meachem",
                    Email = "jmeachem0@eventbrite.com",
                    PhoneNumber = "555555555",
                    Password = "Jacklyn",
                    PasswordHash = null,
                    PasswordSalt = null,
                    Token = "t-user",
                    IsActivated = true,
                },
            };
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<ChatMessage>> InitialMessages()
        {
            var messages = await _chatService.GetAllInitially();
            return messages;
        }
    }
}