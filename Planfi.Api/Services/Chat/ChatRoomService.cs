using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PlanfiApi.Models;
using WebApi.Helpers;
using WebApi.Models;

namespace WebApi.Services.Chat
{
    public interface IChatRoomService
    {
        Task<List<ChatRoom>> GetChatRoomsAsync();
        Task<bool> AddChatRoomAsync(ChatRoom newChatRoom);
    }
    
    public class ChatRoomService : IChatRoomService
    {
        private readonly DataContext _context;
        
        public ChatRoomService(DataContext context) 
        {
            _context = context;
        }

        public async Task<List<ChatRoom>> GetChatRoomsAsync()
        {
            var chatRooms = await _context.chatrooms.ToListAsync();
            return chatRooms;
        }

        public async Task<bool> AddChatRoomAsync(ChatRoom chatRoom)
        {
            chatRoom.Id = Guid.NewGuid();
            _context.chatrooms.Add(chatRoom);
            var saveResults = await _context.SaveChangesAsync();

            return saveResults > 0;
        }
    }
}