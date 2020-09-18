using AutoMapper;
using WebApi.Controllers.ViewModels;
using WebApi.Entities;
using WebApi.Models;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<RegisterModel, Client>();
            CreateMap<UpdateUserModel, Client>();

            CreateMap<CreatePlan, Plan>();

            CreateMap<CreateCategory, Category>();

            CreateMap<CreateExercise, Exercise>();
            CreateMap<UpdateExerciseModel, Exercise>();
            CreateMap<ExerciseModel, Exercise>();
        }
    }
}