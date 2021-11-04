using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlanfiApi.Models;
using WebApi.Common;
using WebApi.Models;
using WebApi.Services.Chat;

namespace WebApi.Controllers.Chat
{
    public class ChatRoomController : ApiControllerBase
    {
        private readonly IChatRoomService _chatRoomService;

        public ChatRoomController(IChatRoomService chatRoomService)
        {
            _chatRoomService = chatRoomService;
        }
        
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var chatRooms = await _chatRoomService.GetChatRoomsAsync();
            return Ok(chatRooms);
        }
        
        [AllowAnonymous]
        [HttpPost]
        public async Task Post([FromBody]ChatRoom chatRoom)
        {
            await _chatRoomService.AddChatRoomAsync(chatRoom);
        }
    }
}