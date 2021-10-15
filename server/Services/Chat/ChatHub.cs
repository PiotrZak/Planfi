using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using WebApi.Services.Chat.ChatRepository;

namespace WebApi.Services.Chat
{
    
    public class ChatMessage
    {
        public ChatMessage(Guid id)
        {
            Id = id.ToString("X");
            Date = DateTimeOffset.Now;
        }
        public ChatMessage() { }
        public string Id { get; set; }
        public DateTimeOffset Date { get; set; }
        public string Message { get; set; }
        public string Sender { get; set; }
    }
    
    public class ChatHub : Hub
    {
        private readonly IChatService _chatService;

        public ChatHub(IChatService chatService)
        {
            _chatService = chatService;
        }

        public void AddMessage(string message)
        {
            var chatMessage = _chatService.CreateNewMessage("Juergen", message);
            // Call the MessageAdded method to update clients.
            Clients.All.InvokeAsync("MessageAdded", chatMessage);
        }
    }

    public interface IChatService
    {
        Task<IEnumerable<ChatMessage>> GetAllInitially();
        Task<ChatMessage> CreateNewMessage(string senderName, string message);
    }
    
    public class ChatService : IChatService
    {
        private readonly IChatMessageRepository _repository;

        public ChatService(IChatMessageRepository repository)
        {
            _repository = repository;
        }

        public async Task<ChatMessage> CreateNewMessage(string senderName, string message)
        {
            var chatMessage = new ChatMessage(Guid.NewGuid())
            {
                Sender = senderName,
                Message = message
            };
            await _repository.AddMessage(chatMessage);

            return chatMessage;
        }

        public async Task<IEnumerable<ChatMessage>> GetAllInitially()
        {
            return await _repository.GetTopMessages();
        }
    }
}