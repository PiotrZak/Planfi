using System;
using GraphQL.Types;

namespace WebApi.Entities.GraphQl
{
    public class CategoryType : ObjectGraphType<Category>
    {
        public CategoryType()
        {
            Name = "Category";

            Field(x => x.CategoryId, type: typeof(IdGraphType)).Description("The ID of the category.");
            Field(x => x.Title).Description("Title of category");
            Field(x => x.Exercises, type: typeof(ListGraphType<ExerciseType>)).Description("Category Exercises");
        }
    }

    internal class ExerciseType : ObjectGraphType<Exercise>
    {

        public ExerciseType()
        {
            Name = "Exercise";

            Field(x => x.ExerciseId, type: typeof(IdGraphType)).Description("The ID of the exercise.");
            Field(x => x.Name).Description("Title of category");
            Field(x => x.Description).Description("Description of category");
        }

    }
}
