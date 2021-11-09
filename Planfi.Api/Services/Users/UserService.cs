using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Dapper;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql;
using PlanfiApi.Data.Entities.Users;
using PlanfiApi.Data.ViewModels;
using PlanfiApi.Interfaces;
using PlanfiApi.Models.ViewModels;
using PlanfiApi.Services.Organizations;
using WebApi.Data.Entities;
using WebApi.Data.Entities.Users;
using WebApi.Helpers;
using WebApi.Models;

namespace PlanfiApi.Services.Users{


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
            if (_context.users.Any(x => x.Email == Email))
                throw new AppException("Email \"" + Email + "\" is already taken"); 
            
            var user = _mapper.Map<User>(Email);

            _context.users.Add(user);
            _context.SaveChanges();

            return user;
        }
        
        public async Task<User> Authenticate(string email, string? password)
        {
            var user = await GetUserWithoutPassword(email);
            
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

        public async Task<User> GetUserWithoutPassword(string email)
        {
            return await _context.users
                .Include(x => x.Role)
                .SingleOrDefaultAsync(x => x.Email.ToLower() == email.ToLower());
        }
        
        public IEnumerable<User> GetAllUsers ()
        {
            var users = _context.users;
            return users;
        }
        
        public async Task<UserViewModel> GetById(string id)
        {
            var user = await _context.users
                .Include(x => x.Role)
                .SingleOrDefaultAsync(x => x.UserId == id);
            
            var userViewModel = new UserViewModel()
            {
                UserId = user.UserId,
                Avatar = user.Avatar,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Role = new Role()
                {
                    Id = user.Role.Id,
                    Name = user.Role.Name,
                },
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                OrganizationId = user.OrganizationId,
            };
            return userViewModel;
        }
        
        public async Task<int> Update(string id, UpdateUserModel model)
        {
            var user = await _context.users.FindAsync(id);

            if (user == null)
                throw new AppException("User not found");

            // update username if it has changed
            if (!string.IsNullOrWhiteSpace(model.Email))
            {
                // // throw error if the new username is already taken
                if (_context.users.Any(x => x.Email == model.Email))
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
                
                user.Password = ExtensionMethods.EncryptPassword(model.NewPassword);
                CreatePasswordHash(model.NewPassword, out var passwordHash, out var passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _context.users.Update(user);
            await _context.SaveChangesAsync();
            return 1;
        }
        public async Task Delete(string[] id)
        {
            foreach (var userId in id)
            {
                var user = await _context.users.FindAsync(userId);
                if (user != null)
                {
                    _context.users.Remove(user);
                    await _context.SaveChangesAsync();
                }
            }
        }

        public IEnumerable<User> GetByRole(string role)
        {
            var users = _context.users
                .Where(x => x.Role.Name == role);
            
            return users;
        }
        
        public async Task<int> AssignClientsToTrainers(string[] trainersId, string[] userIds)
        {
            // [t1]
            // to every trainer add user
            // [u1, u2, u3, u4]
            
            var elementsNotAssigned = new List<ValidationInfo>();

            foreach (var trainerId in trainersId)
            {
                //finding an trainer
                var trainer = await _context.users.FindAsync(trainerId);
                foreach (var userId in userIds)
                {
                    //finding a clients
                    var client = await _context.users.FindAsync(userId);
                    var usersTrainers = new UsersTrainers
                    {
                        TrainerId = trainer?.UserId,
                        ClientId = client?.UserId
                    };

                    await _context.userstrainers.AddAsync(usersTrainers);
                    try
                    { 
                        await _context.SaveChangesAsync();
                        return 1;
                    }
                    catch (DbUpdateException ex)
                    {
                        var validation = new ValidationInfo()
                        {
                            UserId = userId,
                            TrainerId = trainer?.UserId
                        };
                        elementsNotAssigned.Add(validation);
                    }
                }
            }
            
            GenerateValidationInfo(elementsNotAssigned);

            return 0;
        }
        
        public class ValidationInfo
        {
            public string UserId { get; set; }
            public string? TrainerId { get; set; }
            public string? PlanId { get; set; }
        }

        public async Task<int> AssignPlanToClients(string[] clientIds, string[] planIds)
        {
            var elementsNotAssigned = new List<ValidationInfo>();
            foreach (var clientId in clientIds)
            {
                //finding an client 
                var client = await _context.users.FindAsync(clientId);
                
                foreach (var planId in planIds)
                {
                    //finding a plan
                        var plan = await _context.plans.FindAsync(planId);
                        var usersPlans = new UsersPlans {User = client, Plan = plan};
                        await _context.usersplans.AddAsync(usersPlans);
                        
                        try
                        { 
                            await _context.SaveChangesAsync();
                            return 1;
                        }
                        catch (DbUpdateException ex)
                        {
                            if (ex.InnerException != null)
                            {
                                var validation = new ValidationInfo()
                                {
                                    UserId = clientId,
                                    PlanId = planId
                                };
                                elementsNotAssigned.Add(validation);
                            }
                        }
                }
            }

            // exclude that records or throw exception?
            GenerateValidationInfo(elementsNotAssigned);
            
            //return elementsNotAssigned instead number - for inform, which exactly element not processed correctly
            return 1;
        }

        private void GenerateValidationInfo(List<ValidationInfo> info)
        {
            throw new ValidationException(
                 $"The client {info[0].UserId} is already assigned to {info[0].UserId}");
        }


        public async Task<IEnumerable<OrganizationService.UserSqlProjection>>GetClientsByTrainer()
        {

            var context = new HttpContextAccessor().HttpContext;
            var userId = context?.User.FindFirst(ClaimTypes.Name)?.Value;
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();
            
            const string trainerClientsQuery = @"SELECT 
	            u.user_id, 
	            ut.client_id,
	            u.avatar, 
	            r.name as role,
	            u.first_name, 
	            u.last_name, 
	            u.email, 
	            u.phone_number, 
	            u.organization_id,
	            u.is_activated
	            FROM public.users as u
	            JOIN public.role as r
	            ON u.role_id = r.id
	            FULL JOIN public.userstrainers as ut
	            ON ut.client_id = u.user_id
	            WHERE ut.trainer_id = @userId";

            var trainerClients = (await connection.QueryAsync<OrganizationService.UserSqlProjection>(trainerClientsQuery, new {userId})).ToList();

            return trainerClients.ToList();
        }

        public async Task<List<OrganizationService.UserSqlProjection>> GetTrainersByClient(string id)
        {
            var userId = new HttpContextAccessor().HttpContext?.User.FindFirst(ClaimTypes.Name)?.Value;
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();
            
            const string clientTrainersQuery = @"SELECT 
	            u.user_id, 
	            ut.client_id,
	            u.avatar, 
	            r.name as role,
	            u.first_name, 
	            u.last_name, 
	            u.email, 
	            u.phone_number, 
	            u.organization_id,
	            u.is_activated
	            FROM public.users as u
	            JOIN public.role as r
	            ON u.role_id = r.id
	            FULL JOIN public.userstrainers as ut
	            ON ut.client_id = u.user_id
	            WHERE ut.client_id = @userId";

            var clientTrainers = (await connection.QueryAsync<OrganizationService.UserSqlProjection>(clientTrainersQuery, new {userId})).ToList();

            return clientTrainers.ToList();
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


