using System.Collections.Generic;
using System.Threading.Tasks;
using PlanfiApi.Models;

namespace PlanfiApi.Interfaces
{
    public interface IChatService
    {
        Task<List<ChatMessage>> GetAllInitially();
        Task<ChatMessage> CreateNewMessage(string senderName, string message);
    }
}