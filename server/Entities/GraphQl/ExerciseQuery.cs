
using System.Linq;
using GraphQL;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;
using WebApi.Helpers;

namespace WebApi.Entities.GraphQl
{
    public class ExerciseQuery : ObjectGraphType
    {
        public ExerciseQuery(DataContext db)
        {

            Field<ExerciseType>(
                name: "Exercise",
                arguments: new QueryArguments(
                    new QueryArgument<IdGraphType> { Name = "id", Description = "ExerciseID" }),
                resolve: context =>
                {
                    var id = context.GetArgument<string>("ExerciseId");
                    var Exercise = db
                      .Exercises
                      .FirstOrDefault(i => i.ExerciseId == id);
                    return Exercise;
                }
            );
        }
    }
}
