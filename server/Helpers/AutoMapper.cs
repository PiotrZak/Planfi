using AutoMapper;
using WebApi.Controllers.ViewModels;
using WebApi.Data.Entities;
using WebApi.Data.Entities.Users;
using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<CreateOrganization, Organization>();

            CreateMap<ActivateAccount, User>();

            CreateMap<RegisterModel, User>();
            CreateMap<AuthenticateModel, User>();
            CreateMap<UpdateUserModel, User>();
            
            CreateMap<User, UserViewModel>();

            CreateMap<CreateCategory, Category>();

            CreateMap<CreatePlan, Plan>();
            CreateMap<Plan, ResultPlan>();

            CreateMap<CreateExercise, Exercise>();
            CreateMap<UpdateExerciseModel, Exercise>();
            CreateMap<ExerciseModel, Exercise>();
        }
    }
}