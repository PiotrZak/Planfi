using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Controllers.ViewModels;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IUserService
    {
        Client Authenticate(string email, string password);

        IEnumerable<Client> GetAllClients();
        IEnumerable<Client> GetAllTrainers();

        Client GetById(string id);
        Client Create(Client user, string password);
        void Update(Client user, string password);
        void Delete(string[] id);
        IEnumerable<Client> GetByRole(string role);

        void AssignUsersToTrainer(string[] TrainerIds, string[] UsersIds);
        void AssignPlanToUser(string[] userIds, string[] planIds);

        //void UnassignUsersToTrainer(string trainerId, string[] usersId);
        //void UnassignPlanToUser(string[] userIds, string[] planIds);
    }

    public class UserService : IUserService
    {
        private DataContext _context;
        private readonly AppSettings _appSettings;

        public UserService(DataContext context)
        {
            _context = context;
        }

        public Client Authenticate(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Clients.SingleOrDefault(x => x.Email == email);

            // check if email exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // authentication successful
            return user;
        }


        public IEnumerable<Client> GetAllClients()
        {
            var clients = _context.Clients.WithoutPasswords();
            return clients;
        }

        public IEnumerable<Client> GetAllTrainers()
        {
            //security issues
            var trainers = _context.Clients.WithoutPasswords();
            return trainers;
        }

        public Client GetById(string id)
        {

            var client = _context.Clients.FirstOrDefault(x => x.ClientId == id);

            return client.WithoutPassword();
        }

        public void Update(Client userParam, string newPassword)
        {
            var user = _context.Clients.Find(userParam.ClientId);

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

            _context.Clients.Update(user);
            _context.SaveChanges();
        }



        public void Delete(string[] id)
        {

            foreach (var UserId in id)
            {
                var user = _context.Clients.Find(UserId);
                if (user != null)
                {
                    _context.Clients.Remove(user);
                    _context.SaveChanges();
                }
            }
        }


        public Client Create(Client user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_context.Clients.Any(x => x.Email == user.Email))
                throw new AppException("Email \"" + user.Email + "\" is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Clients.Add(user);
            _context.SaveChanges();

            return user;
        }

        public IEnumerable<Client> GetByRole(string role)
        {
            var Users = _context.Clients.Where(x => x.Role == role);
            return Users;
        }

        public void AssignUsersToTrainer(string[] TrainersId, string[] UsersId)
        {         
            // [t1]
            // to every trainer add user
            // [u1, u2, u3, u4]

            foreach (var trainerId in TrainersId)
            {
                //finding an trainer
                var trainer = _context.Trainers.Find(trainerId);

                foreach (var userId in UsersId)
                {
                    //finding a clients
                    var client = _context.Clients.Find(userId);
                    var usersTrainers = new UsersTrainers { Trainer = trainer, Client = client };

                    _context.UsersTrainers.Add(usersTrainers);
                    _context.SaveChanges();
                }
            }
        }


        public void AssignPlanToUser(string[] UserIds, string[] PlanIds)
        {

        // [u1, u2]
        // to every user add plan
        // [p1, p2, p3, p4]

            foreach (var userId in UserIds)
            {
                //finding an client
                var client = _context.Clients.Find(userId);

                foreach (var planId in PlanIds)
                {
                    //finding a plan
                    var plan = _context.Plans.Find(planId);

                    var usersPlans = new UsersPlans { Client = client, Plan = plan };
                    _context.UsersPlans.Add(usersPlans);
                    _context.SaveChanges();
                }
            }
        }


        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }


        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using var hmac = new System.Security.Cryptography.HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }

    }
}


