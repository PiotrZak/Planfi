using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using WebApi.Controllers.ViewModels;
using Microsoft.Extensions.Configuration;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Services{


    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public IConfiguration Configuration { get; }

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
        
        public User Authenticate(string Email, string Password)
        {
            var user = _context.Users.SingleOrDefault(x => x.Email == Email);

            // check if email exists
            if (user.Email == null)
                return null;

            // for seeded data - for testing
            if (user.PasswordHash != null && user.PasswordSalt != null)
            {
                var isCorrect = VerifyPasswordHash(Password, user.PasswordHash, user.PasswordSalt);
                if (isCorrect == false)
                    return null;
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
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("VPS"));
            connection.Open();
            
            var user = connection.Query<UserViewModel>("SELECT \u0022UserId\u0022, \u0022Avatar\u0022, \u0022FirstName\u0022, \u0022LastName\u0022, \u0022Role\u0022, \u0022Email\u0022, \u0022PhoneNumber\u0022 FROM public.\u0022Users\u0022 WHERE \u0022UserId\u0022 = @id",
                new { id }).FirstOrDefault();

            return user;
        }
        
        public void Update(string id, UpdateUserModel model)
        {
            var user = _context.Users.Find(id);

            if (user == null)
                throw new AppException("User not found");

            // update username if it has changed
            if (!string.IsNullOrWhiteSpace(model.Email))
            {
                // // throw error if the new username is already taken
                // if (_context.Clients.Any(x => x.Email == model.Email))
                //     throw new AppException("Username " + model.Email + " is already taken");
                //
                // // throw error if the password is incorrect
                // if (user.Password != model.Password)
                //     throw new AppException("Incorrect password");

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
                    throw new AppException("Incorrect password");

                user.Password = model.NewPassword;
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(model.NewPassword, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _context.Users.Update(user);
            _context.SaveChanges();
        }



        public void Delete(string[] id)
        {
            foreach (var UserId in id)
            {
                var user = _context.Users.Find(UserId);
                if (user != null)
                {
                    _context.Users.Remove(user);
                    _context.SaveChanges();
                }
            }
        }

        public IEnumerable<User> GetByRole(string role)
        {
            var Users = _context.Clients.Where(x => x.Role == role);
            return Users;
        }
        
        public void AssignClientsToTrainers(string[] TrainersId, string[] UserIds)
        {         
            // [t1]
            // to every trainer add user
            // [u1, u2, u3, u4]

            foreach (var trainerId in TrainersId)
            {
                //finding an trainer
                var trainer = _context.Trainers.Find(trainerId);

                foreach (var userId in UserIds)
                {
                    //finding a clients
                    var client = _context.Clients.Find(userId);
                    var usersTrainers = new ClientsTrainers { Trainer = trainer, Client = client };

                    _context.ClientsTrainers.Add(usersTrainers);
                    _context.SaveChanges();
                }
            }
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
                        
                        // todo - validation here
                        await _context.ClientsPlans.AddAsync(usersPlans);
                        try
                        { 
                            await _context.SaveChangesAsync();
                            return 1;
                        }
                        catch (DbUpdateException ex)
                        {
                            if (ex.InnerException != null) throw new Exception(ex.InnerException.Message);
                        }
                }
            }

            return 1;
        }
        

        public IEnumerable<Client> GetClientsByTrainer(string id)

        // [t1]
        // ["u1","u2","u3"]
        {
            var clientsTrainers = _context.ClientsTrainers.Where(x => x.TrainerId == id);

            var clientIds = new List<string>();

            foreach (var i in clientsTrainers)
            {
                var clientId = i.ClientId;
                clientIds.Add(clientId);

            }

            return clientIds.Select((t, i) => (Client) _context.Clients.FirstOrDefault(x => x.ClientId == clientIds[i])).ToList();
        }

        public IEnumerable<Trainer> GetTrainersByClient(string id)

        {
            var clientsTrainers = _context.ClientsTrainers.Where(x => x.ClientId == id);

            var trainersIds = new List<string>();

            foreach (var i in clientsTrainers)
            {
                var trainerId = i.TrainerId;
                trainersIds.Add(trainerId);
            }

            return trainersIds.Select((t, i) => (Trainer) _context.Trainers.FirstOrDefault(x => x.TrainerId == trainersIds[i])).ToList();
        }
        
        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

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


