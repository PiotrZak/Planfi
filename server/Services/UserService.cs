using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using WebApi.Controllers.ViewModels;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IUserService
    {
        User Authenticate(string Email, string Password);
        /*Client Register(Client user, string password);*/

        User Register(string email);

        IEnumerable<User> GetAllUsers();

        IEnumerable<Client> GetAllClients();
        IEnumerable<Trainer> GetAllTrainers();

        User GetById(string id);
        void Update(User user, string password);
        void Delete(string[] id);
        IEnumerable<User> GetByRole(string role);

        void AssignClientsToTrainers(string[] TrainerIds, string[] UserIds);
        void AssignPlanToClients(string[] userIds, string[] planIds);

        //void UnAssignClientsToTrainers(string trainerId, string[] usersId);
        //void UnAssignPlanToClients(string[] userIds, string[] planIds);

        IEnumerable<Client> GetClientsByTrainer(string TrainerId);
        IEnumerable<Trainer> GetTrainersByClient(string ClientId);

        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
    }

    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UserService(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /*public Client Register(Client user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_context.Clients.Any(x => x.Email == user.Email))
                throw new AppException("Email \"" + user.Email + "\" is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.VerificationToken = _accountService.randomTokenString();
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }*/

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
            if (user == null)
                return null;

            //todo - security hashiing & salting password
            //check if password is correct
            //if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            //        return null;

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

        public User GetById(string id)
        {
            var user = _context.Users.FirstOrDefault(x => x.UserId == id);
            return user.WithoutPassword();
        }

        public void Update(User userParam, string newPassword)
        {
            var user = _context.Users.Find(userParam.UserId);

            if (user == null)
                throw new AppException("User not found");

            // update username if it has changed
            if (!string.IsNullOrWhiteSpace(userParam.Email))
            {
                // throw error if the new username is already taken
                if (_context.Clients.Any(x => x.Email == userParam.Email))
                    throw new AppException("Username " + userParam.Email + " is already taken");

                // throw error if the password is incorrect
                if (user.Password != userParam.Password)
                    throw new AppException("Incorrect password");

                user.Email = userParam.Email;
            }

            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(userParam.FirstName))
                user.FirstName = userParam.FirstName;

            if (!string.IsNullOrWhiteSpace(userParam.LastName))
                user.LastName = userParam.LastName;

            if (userParam.PhoneNumber != user.PhoneNumber)
                user.PhoneNumber = userParam.PhoneNumber;

            // update password if provided
            if (!string.IsNullOrWhiteSpace(newPassword))
            {
                // throw error if the password is incorrect
                if (user.Password != userParam.Password)
                    throw new AppException("Incorrect password");

                user.Password = newPassword;
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(newPassword, out passwordHash, out passwordSalt);

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


        public void AssignPlanToClients(string[] ClientIds, string[] PlanIds)
        {

        // [u1, u2]
        // to every user add plan
        // [p1, p2, p3, p4]

            foreach (var clientId in ClientIds)
            {
                //finding an client 
                var client = _context.Clients.Find(clientId);

                foreach (var planId in PlanIds)
                {
                    //finding a plan
                    var plan = _context.Plans.Find(planId);

                    var usersPlans = new ClientsPlans { Client = client, Plan = plan };

                    // todo - create exercises instances 
                    // todo here handle duplication
                    //if()
                    //    throw new ArgumentException("");

                    _context.ClientsPlans.Add(usersPlans);
                    _context.SaveChanges();
                }
            }
        }

        public IEnumerable<Client> GetClientsByTrainer(string id)

        // [t1]
        // ["u1","u2","u3"]
        // full list of clients

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


