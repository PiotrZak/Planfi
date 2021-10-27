using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApi.Helpers;
using WebApi.Models;

namespace WebApi.Services.Chat
{

    public interface IMessageService
    {
        Task<List<Message>> GetMessagesAsync();
        Task<List<Message>> GetMessagesForChatRoomAsync(Guid roomId);
        Task<bool> AddMessageToRoomAsync(Guid roomId, Message message);
    }

    public class MessageService : IMessageService
    {
        private readonly DataContext _context;

        public MessageService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Message>> GetMessagesAsync()
        {
            var messages = await _context.messages.ToListAsync();

            return messages;
        }

        public async Task<List<Message>> GetMessagesForChatRoomAsync(Guid roomId)
        {
            var messagesForRoom = await _context.messages
                .Where(m => m.RoomId == roomId)
                .ToListAsync<Message>();

            return messagesForRoom;
        }

        public async Task<bool> AddMessageToRoomAsync(Guid roomId, Message message)
        {
            message.Id = Guid.NewGuid();
            message.RoomId = roomId;
            message.PostedAt = DateTimeOffset.Now;

            _context.messages.Add(message);

            var saveResults = await _context.SaveChangesAsync();

            return saveResults > 0;
        }
    }
}