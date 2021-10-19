using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using WebApi.Data.Entities;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.Models.ViewModels;
using WebApi.Services.Chat;
using WebApi.Services.Exercises;

namespace WebApi.GraphQl
{

    public class Query
    {
        private readonly ICategoryService _categoryService;
        private readonly IPlanService _planService;
        private readonly IExerciseService _exerciseService;
        private readonly IOrganizationService _organizationService;
        private readonly IChatRoomService _chatRoomService;
        private readonly IMessageService _messageService;
        
        public Query(
            ICategoryService categoryService,
            IPlanService planService,
            IExerciseService exerciseService, 
            IOrganizationService organizationService, 
            IChatRoomService chatRoomService, IMessageService messageService)
        {
            _categoryService = categoryService ;
            _planService = planService ;
            _exerciseService = exerciseService;
            _organizationService = organizationService;
            _chatRoomService = chatRoomService;
            _messageService = messageService;
        }
        
        [UseFiltering]
        public Exercise GetExercise(
           [Service] DataContext dbContext, string id) =>
               dbContext.Exercises.FirstOrDefault(x => x.ExerciseId == id);
        
        [UseFiltering]
        public List<CategoryService.CategoryViewModel> GetCategories([Service] DataContext dbContext) =>
            _categoryService.GetAll().ToList();
        
        [UseFiltering]
        public List<Plan> GetPlans([Service] DataContext dbContext) =>
            _planService.GetAll().ToList();
        
        [UseFiltering]
        public List<ExerciseViewModel> GetSerializedExercises([Service] DataContext dbContext) => 
            _exerciseService.GetSerializedExercises().ToList();
        
        [UseFiltering]
        public List<ExerciseViewModel> GetSerializedExercisesInstances([Service] DataContext dbContext) => 
            _exerciseService.GetSerializedExercisesInstances().ToList();
        
        [UseFiltering]
        public List<UserViewModel> GetUsers([Service] DataContext dbContext) => 
            _organizationService.GetUsers().ToList();

        [UseFiltering]
        public async Task<List<ChatRoom>> GetChatRooms([Service] DataContext dbContext) =>
            await _chatRoomService.GetChatRoomsAsync();
        
        [UseFiltering]
        public async Task<List<Message>> GetMessages([Service] DataContext dbContext) => 
            await _messageService.GetMessagesAsync();
    }
    
    public static class ExtensionMethods
    {
        public static IEnumerable<Exercise> WithoutFiles(this IEnumerable<Exercise> exercises)
        {
            if (exercises == null) return null;
            return exercises.Select(x => x.WithoutFile());
        }

        public static Exercise WithoutFile(this Exercise exercise)
        {
            if (exercise == null) return null;

            exercise.Files = null;
            return exercise;
        }
    }

}
