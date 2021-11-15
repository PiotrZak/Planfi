using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.Configuration;
using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using PlanfiApi.Helpers;
using PlanfiApi.Models;
using WebApi.Helpers;
using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

namespace PlanfiApi.Services.Chat
{

    public interface IMessageService
    {
        Task<List<MessageViewModel>> GetMessagesAsync();
        Task<List<MessageViewModel>> GetMessagesForChatRoomAsync(Guid roomId);
        Task<bool> AddMessageToRoomAsync(Guid roomId, Message message);
    }

    public class MessageService : IMessageService
    {
        private readonly DataContext _context;
        private IConfiguration Configuration { get; }
        
        public MessageService(DataContext context, IConfiguration configuration)
        {
	        _context = context;
	        Configuration = configuration;
        }

        public async Task<List<MessageViewModel>> GetMessagesAsync()
        {
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();

            var messages = new List<MessageViewModel>();
            try{
	            const string messagesQuery = @"SELECT 
	            m.id,
	            CONCAT(u.first_name, u.last_name) as user_name,
	            u.avatar,
	            m.contents,
	            m.room_id,
	            m.user_name,
	            m.posted_at
	            FROM public.messages as m
	            JOIN public.users as u
	            ON u.user_id = m.user_name";
	            messages = (await connection.QueryAsync<MessageViewModel>(messagesQuery)).ToList();
            }
            catch (Exception exp) {
	            Console.Write(exp.Message);
            }
            finally
            {
	            await connection.CloseAsync();
            }


            return messages;
        }

        public async Task<List<MessageViewModel>> GetMessagesForChatRoomAsync(Guid roomId)
        {
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();

            var messages = new List<MessageViewModel>();
            try{
	            const string messagesQuery = @"SELECT 
		            m.id,
		            CONCAT(u.first_name, ' ', u.last_name) as user_name,
		            u.avatar,
		            m.contents,
		            m.room_id,
		            m.user_name as user_id,
		            m.posted_at
		            FROM public.messages as m
		            JOIN public.users as u
		            ON u.user_id = m.user_name
		            WHERE m.room_id = @roomId";
	            messages = (await connection.QueryAsync<MessageViewModel>(messagesQuery, new {roomId})).ToList();
	        }
	        catch (Exception exp) {
		        Console.Write(exp.Message);
	        }
	        finally
	        {
		        await connection.CloseAsync();
	        }
            return messages;
        }

        public async Task<bool> AddMessageToRoomAsync(Guid roomId, Message message)
        {
            message.Id = Guid.NewGuid();
            message.RoomId = roomId;
            message.PostedAt = DateTime.UtcNow;

            _context.messages.Add(message);

            var saveResults = await _context.SaveChangesAsync();

            return saveResults > 0;
        }
    }
}