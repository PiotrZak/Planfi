using AutoMapper;
using WebApi.Controllers.ViewModels;
using WebApi.Entities;
using WebApi.GraphQl;
using WebApi.Models;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {

            CreateMap<CreateOrganization, Organization>();

            CreateMap<RegisterModel, User>();
            CreateMap<RegisterModel, Client>();
            CreateMap<AuthenticateModel, User>();

            CreateMap<UpdateUserModel, User>();

            CreateMap<Client, TrainerClient>();
            CreateMap<Trainer, TrainerClient>();

            CreateMap<CreateCategory, Category>();

            CreateMap<CreatePlan, Plan>();
            CreateMap<Plan, ResultPlan>();

            CreateMap<CreateExercise, Exercise>();
            CreateMap<UpdateExerciseModel, Exercise>();
            CreateMap<ExerciseModel, Exercise>();
        }
    }
}