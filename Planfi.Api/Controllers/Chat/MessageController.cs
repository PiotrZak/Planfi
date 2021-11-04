using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlanfiApi.Models;
using PlanfiApi.Services.Chat;
using WebApi.Common;
using WebApi.Models;
using WebApi.Services.Chat;

namespace WebApi.Controllers.Chat
{
    [Route("api/[controller]")]
    public class MessageController : ApiControllerBase
    {
        private readonly IMessageService _messageService;

        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        // GET: api/values
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var messagesForRoom = await _messageService.GetMessagesAsync();

            return Ok(messagesForRoom);
        }

        // GET api/values/5
        [AllowAnonymous]
        [HttpGet("{roomId}")]
        public async Task<IActionResult> Get(Guid roomId)
        {
            if (roomId == Guid.Empty)
            {
                return NotFound();
            }

            var messagesForRoom = await _messageService.GetMessagesForChatRoomAsync(roomId);

            return Ok(messagesForRoom);
        }

        // POST api/values
        [AllowAnonymous]
        [HttpPost]
        public async void Post([FromBody] Message message)
        {
            await _messageService.AddMessageToRoomAsync(message.RoomId, message);
        }
    }
}