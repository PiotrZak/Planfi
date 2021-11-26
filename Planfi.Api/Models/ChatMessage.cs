using System;

namespace PlanfiApi.Models
{
    
    public class ChatRoom
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }

    public class Message
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public string Contents { get; set; }
        public string UserName { get; set; }
        public DateTime PostedAt { get; set; }
    }
    
    public class MessageViewModel
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public byte[] Avatar { get; set; }
        public string Contents { get; set; }
        public string UserName { get; set; }
        public string UserId { get; set; }
        public DateTime PostedAtUtc{ get; set; }
    }
    
    public class ChatMessage
    {
        public ChatMessage(Guid id)
        {
            Id = id.ToString("X");
            Date_Utc = DateTime.UtcNow;
        }
        public ChatMessage() { }
        
        //connection with chatroom
        public Guid RoomId { get; set; }
        public string Id { get; set; }
        public DateTime Date_Utc { get; set; }
        public string Message { get; set; }
        public string Sender { get; set; }
    }
}
