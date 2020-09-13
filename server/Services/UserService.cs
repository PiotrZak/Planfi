using System;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;

namespace WebApi.Services
{
    public interface IUserService
    {
        User Authenticate(string email, string password);
        IEnumerable<User> GetAll();
        User GetById(string id);
        User Create(User user, string password);
        void Update(User user, string password);
        void Delete(string id);
        IEnumerable<User> GetByRole(string role);

        void AssignUsersToTrainer(string trainerId, string[] usersId);
        void UnassignUsersToTrainer(string trainerId, string[] usersId);

        void AssignPlanToUser(string userId, string[] planId);
        void UnassignPlanToUser(string userId, string[] planId);
    }

    public class UserService : IUserService
    {
        private DataContext _context;
        private readonly AppSettings _appSettings;

        public UserService(DataContext context)
        {
            _context = context;
        }

        public User Authenticate(string email, string password)
        {
            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Users.SingleOrDefault(x => x.Email == email);

            // check if email exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // authentication successful
            return user;
        }

        public IEnumerable<User> GetAll()
        {

            return _context.Users.WithoutPasswords();
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
                if (_context.Users.Any(x => x.Email == userParam.Email))
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



        public void Delete(string id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }


        public User Create(User user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_context.Users.Any(x => x.Email == user.Email))
                throw new AppException("Email \"" + user.Email + "\" is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Users.Add(user);
            _context.SaveChanges();

            return user;
        }

        public IEnumerable<User> GetByRole(string role)
        {
            var Users = _context.Users.Where(x => x.Role == role);
            return Users;
        }


        // todo - find way to refactor this logic
        public void AssignUsersToTrainer(string trainerId, string[] usersId)
        {
            var trainer = _context.Trainers.FirstOrDefault(x => x.TrainerId == trainerId);

            foreach (var id in usersId)
            {
                var element = _context.Users.Find(id);
                trainer.Users.Add(element);
            }
            _context.Trainers.Update(trainer);
            _context.SaveChanges();
        }

        public void UnassignUsersToTrainer(string trainerId, string[] usersId)
        {
            var trainer = _context.Trainers.FirstOrDefault(x => x.TrainerId == trainerId);

            foreach (var id in usersId)
            {
                var element = _context.Users.Find(id);
                trainer.Users.Remove(element);
            }
            _context.Trainers.Update(trainer);
            _context.SaveChanges();
        }

        public void AssignPlanToUser(string UserId, string[] PlanId)
        {
            var user = GetById(UserId);

            foreach (var id in PlanId)
            {
                var element = _context.Plans.Find(id);
                user.Plans.Add(element);
            }
            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void UnassignPlanToUser(string UserId, string[] PlanId)
        {
            var user = GetById(UserId);

            foreach (var id in PlanId)
            {
                var element = _context.Plans.Find(id);
                user.Plans.Remove(element);
            }
            _context.Users.Update(user);
            _context.SaveChanges();
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


