using AutoMapper;
using PlanfiApi.Data.Entities;
using PlanfiApi.Data.Entities.Users;
using PlanfiApi.Data.ViewModels;
using PlanfiApi.Models;
using PlanfiApi.Models.ViewModels;
using PlanfiApi.Controllers.ViewModels;
using PlanfiApi.Entities;

namespace PlanfiApi.Helpers
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