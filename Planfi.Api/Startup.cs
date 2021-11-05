using System;
using System.Text;
using System.Text.Json.Serialization;
using HotChocolate.AspNetCore;
using HotChocolate.AspNetCore.Playground;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PlanfiApi.GraphQl;
using PlanfiApi.Interfaces;
using PlanfiApi.Models;
using PlanfiApi.Services.Chat;
using PlanfiApi.Services.Exercises;
using PlanfiApi.Services.Files;
using PlanfiApi.Services.Organizations;
using PlanfiApi.Services.Users;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.Services.Account;
using WebApi.Services.Chat;
using AccountService = WebApi.Services.Account.AccountService;
using Path = System.IO.Path;
using PlanService = PlanfiApi.Services.Plans.PlanService;

namespace PlanfiApi
{
    public class Startup
    {
        private readonly IWebHostEnvironment _env;
        private IConfiguration Configuration { get; }
        
        private readonly string _myAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IWebHostEnvironment env, IConfiguration configuration)
        {
            _env = env;
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson();

            var origins = Configuration["Origins"];
            services.AddCors(options =>
            {
                options.AddPolicy(_myAllowSpecificOrigins,
                    builder =>
                    {
                        builder
                            .WithOrigins(origins?.Split(','))
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                    });
            });
            
            services.AddSignalR();

            // Use a PostgreSQL database
            var sqlConnectionString = Configuration.GetConnectionString("WebApiDatabase");
            services.AddDbContext<DataContext>(options =>
                options.UseNpgsql(sqlConnectionString));

            services.Configure<FormOptions>(options => options.ValueCountLimit = 20000); 
            
            services.AddIdentityCore<IdentityUser>()
                .AddDefaultTokenProviders()
                .AddEntityFrameworkStores<DataContext>();

            // AutoMapper
            services.AddAutoMapper(typeof(Startup));

            // Swagger
            services.AddSwaggerGen(c =>
            {
               c.SwaggerDoc("v1", new OpenApiInfo { Title = "PlanFi", Version = "v1" });
            });

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            
            var gcCredentialsPath = Path.Combine(Environment.CurrentDirectory, "gc_sa_key.json");
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", gcCredentialsPath);

            // email configuration
            services.AddSingleton(Configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>());
            services.AddTransient<IEmailService, EmailService>();
            services.AddSession();
            
            //payment conf
            //todo - for what clients are able to pay?
            //add products and plans
            //StripeConfiguration.SetApiKey(Configuration["Stripe:SecretKey"]);
            
            //chat module
            services.AddIdentityServer()
                .AddDeveloperSigningCredential()
                .AddInMemoryIdentityResources(ChatIdentityServer.GetIdentityResources())
                .AddInMemoryApiResources(ChatIdentityServer.GetApiResources())
                .AddInMemoryClients(ChatIdentityServer.GetClients())
                .AddTestUsers(ChatIdentityServer.GetUsers());
            

            services.AddScoped<IChatRoomService, ChatRoomService>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddScoped<IOrganizationService, OrganizationService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IPlanService, PlanService>();
            services.AddScoped<IExerciseService, ExerciseService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IFileService, FileService>();
            services.AddHttpContextAccessor();
            //services.AddScoped<IPayPalProcesesing, PayPalProcessing>();
            //services.AddScoped<IStripeProcessing, StripeProcessing>();
            
            services.AddMvc().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
            });

            services.AddScoped<Query>();
            services
                .AddGraphQLServer()
                .AddQueryType<Query>();
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataContext dataContext)
        {
                //dataContext.Database.Migrate();
                app.UseCors(_myAllowSpecificOrigins);
                app.UseRouting();
                app.UseSwagger();
                app.UseSession();
                app.UseHttpsRedirection();

                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Planfi");
                });
            
                //chat module
                
                //Middlewares
                //var sqlConnectionString = Configuration.GetConnectionString("WebApiDatabase");
                //app.UseMiddleware<GetUserContextMiddleware>(sqlConnectionString);
                
                app.UseIdentityServer();
                app.UseAuthorization();
                app.UseEndpoints(routes =>
                {
                    routes.MapHub<ChatHub>("chat");
                    routes.MapControllers();
                    routes.MapGraphQL();
                    routes.MapControllerRoute("default", "{controller=Health}/{action=Get}");
                });
                
                app.UsePlayground(new PlaygroundOptions { QueryPath = "/graphql", Path = "/playground" });
                app.UseAuthentication();
        }
    }
}
