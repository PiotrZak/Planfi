using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Dapper;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using WebApi.Controllers.ViewModels;
using Microsoft.Extensions.Configuration;
using WebApi.Data.Entities.Users;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Services{


    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private IConfiguration Configuration { get; }

        public UserService(DataContext context, IMapper mapper, IConfiguration configuration)
        {
            Configuration = configuration;
            _context = context;
            _mapper = mapper;
        }
        
        public User Register(string Email)
        {
            if (_context.Clients.Any(x => x.Email == Email))
                throw new AppException("Email \"" + Email + "\" is already taken"); 
            
            var user = _mapper.Map<User>(Email);

            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }
        
        public User Authenticate(string email, string password)
        {
            var user = _context.Users.SingleOrDefault(x => x.Email == email);

            // check if email exists
            if (user == null)
                throw new ValidationException(
                    $"Invalid mail");

            // for seeded data - for testing
            if (user.PasswordHash != null && user.PasswordSalt != null)
            {
                var isCorrect = VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt);
                if (isCorrect == false)
                    throw new ValidationException(
                        $"Invalid password");
            }
            // authentication successful
            return user.WithoutPassword(); ;
        }
        
        public IEnumerable<User> GetAllUsers ()
        {
            var users = _context.Users;
            return users;
        }

        public IEnumerable<Client> GetAllClients()
        {
            var clients = _context.Clients;
            return clients;
        }

        public IEnumerable<Trainer> GetAllTrainers()
        {
            //security issues
            var trainers = _context.Trainers;
            return trainers;
        }
        
        public UserViewModel GetById(string id)
        {
            //dapper query
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            connection.Open();
            
            var user = connection.Query<UserViewModel>("SELECT \u0022UserId\u0022, \u0022Avatar\u0022, \u0022FirstName\u0022, \u0022LastName\u0022, \u0022Role\u0022, \u0022Email\u0022, \u0022PhoneNumber\u0022 FROM public.\u0022Users\u0022 WHERE \u0022UserId\u0022 = @id",
                new { id }).FirstOrDefault();

            return user;
        }
        
        public async Task<int> Update(string id, UpdateUserModel model)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                throw new AppException("User not found");

            // update username if it has changed
            if (!string.IsNullOrWhiteSpace(model.Email))
            {
                // // throw error if the new username is already taken
                if (_context.Users.Any(x => x.Email == model.Email))
                    throw new ValidationException(
                        $"Mail {model.Email} is already assigned to another user");
                
                user.Email = model.Email;
            }

            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(model.FirstName))
                user.FirstName = model.FirstName;

            if (!string.IsNullOrWhiteSpace(model.LastName))
                user.LastName = model.LastName;

            if (model.PhoneNumber != user.PhoneNumber)
                user.PhoneNumber = model.PhoneNumber;

            // update password if provided
            if (!string.IsNullOrWhiteSpace(model.NewPassword))
            {
                // throw error if the password is incorrect
                if (user.Password != model.Password)
                    throw new ValidationException(
                        $"Incorrect Password");

                user.Password = model.NewPassword;
                CreatePasswordHash(model.NewPassword, out var passwordHash, out var passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return 1;
        }



        public async Task Delete(string[] id)
        {
            foreach (var userId in id)
            {
                var user = await _context.Users.FindAsync(userId);
                if (user != null)
                {
                    _context.Users.Remove(user);
                    await _context.SaveChangesAsync();
                }
            }
        }

        public IEnumerable<User> GetByRole(string role)
        {
            var users = _context.Clients
                .Where(x => x.Role == role);
            
            return users;
        }
        
        public async Task<int> AssignClientsToTrainers(string[] TrainersId, string[] UserIds)
        {
            // [t1]
            // to every trainer add user
            // [u1, u2, u3, u4]

            foreach (var trainerId in TrainersId)
            {
                //finding an trainer
                var trainer = await _context.Users.FindAsync(trainerId);
                foreach (var userId in UserIds)
                {
                    //finding a clients
                    var client = await _context.Clients.FindAsync(userId);
                    var usersTrainers = new ClientsTrainers
                    {
                        TrainerId = trainer.UserId,
                        ClientId = client.UserId
                    };

                    await _context.ClientsTrainers.AddAsync(usersTrainers);
                    try
                    { 
                        await _context.SaveChangesAsync();
                        return 1;
                    }
                    catch (DbUpdateException ex)
                    {
                        if (ex.InnerException != null)
                        {
                            var trainerName = await _context.Users
                                .Where(x => x.UserId == trainerId)
                                .Select(x => x.FirstName)
                                .FirstAsync();
                                
                            var clientName = await _context.Users
                                .Where(x => x.UserId == userId)
                                .Select(x => x.FirstName)
                                .FirstAsync();

                            throw new ValidationException(
                                $"The trainer {trainerName} is already assigned to {clientName}");
                        }
                    }
                }
            }

            return 0;
        }

        public async Task<int> AssignPlanToClients(string[] ClientIds, string[] PlanIds)
        {
            foreach (var clientId in ClientIds)
            {
                //finding an client 
                var client = await _context.Clients.FindAsync(clientId);

                foreach (var planId in PlanIds)
                {
                    //finding a plan
                        var plan = await _context.Plans.FindAsync(planId);
                        var usersPlans = new ClientsPlans {Client = client, Plan = plan};
                        
                        await _context.ClientsPlans.AddAsync(usersPlans);
                        try
                        { 
                            await _context.SaveChangesAsync();
                            return 1;
                        }
                        catch (DbUpdateException ex)
                        {
                            if (ex.InnerException != null)
                            {
                                var clientName = await _context.Clients
                                    .Where(x => x.UserId == clientId)
                                    .Select(x => x.FirstName)
                                    .FirstAsync();
                                
                                var planTitle = await _context.Plans
                                    .Where(x => x.PlanId == planId)
                                    .Select(x => x.Title)
                                    .FirstAsync();

                                throw new ValidationException(
                                    $"The client {clientName} is already assigned to {planTitle}");
                            }
                        }
                }
            }

            return 1;
        }
        

        public async Task<IEnumerable<User>>GetClientsByTrainer(string id)
        {
            var clientsTrainers = await _context.ClientsTrainers
                .Where(x => x.TrainerId == id)
                .Select(x => x.ClientId)
                .ToListAsync();
            
            var clientIds = clientsTrainers.ToList();

            return clientIds.Select((t, i) => (User) _context.Users
                .FirstOrDefault(x => x.UserId == clientIds[i]))
                .ToList();
        }

        public async Task<IEnumerable<User>> GetTrainersByClient(string id)
        {
            var clientsTrainers = await _context.ClientsTrainers
                .Where(x => x.ClientId == id)
                .Select(x => x.TrainerId)
                .ToListAsync();
            
            var trainersIds = clientsTrainers.ToList();

            return trainersIds.Select((t, i) => (User) _context.Users
                    .FirstOrDefault(x => x.UserId == trainersIds[i]))
                    .ToList();
        }
        
        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            if (storedHash.Length != 64)
                throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128)
                throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt);
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return !computedHash.Where((t, i) => t != storedHash[i]).Any();
        }


        public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using var hmac = new System.Security.Cryptography.HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }


    }
}


