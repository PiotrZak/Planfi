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
        public DateTimeOffset PostedAt { get; set; }
    }
    
    public class MessageViewModel
    {
        public Guid Id { get; set; }
        public Guid Room_Id { get; set; }
        public byte[] Avatar { get; set; }
        public string Contents { get; set; }
        public string User_Name { get; set; }
        public string User_Id { get; set; }
        public DateTimeOffset Posted_At { get; set; }
    }
    
    public class ChatMessage
    {
        public ChatMessage(Guid id)
        {
            Id = id.ToString("X");
            Date = DateTimeOffset.Now;
        }
        public ChatMessage() { }
        
        //connection with chatroom
        public Guid RoomId { get; set; }
        public string Id { get; set; }
        public DateTimeOffset Date { get; set; }
        public string Message { get; set; }
        public string Sender { get; set; }
    }
}