
using System.Linq;
using GraphQL;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;
using WebApi.Helpers;

namespace WebApi.Entities.GraphQl
{
    public class CategoryQuery : ObjectGraphType
    {
        public CategoryQuery(DataContext db)
        {

            Field<CategoryType>(
                name: "Category",
                arguments: new QueryArguments(
                    new QueryArgument<IdGraphType> { Name = "id", Description = "categoryID" }),
                resolve: context =>
                {
                    var id = context.GetArgument<string>("CategoryId");
                    var category = db
                      .Categories
                      .Include(a => a.Exercises)
                      .FirstOrDefault(i => i.CategoryId == id);
                    return category;
                }
            );

            Field<ListGraphType<CategoryType>>(
              "Categories",
              resolve: context =>
              {
                  var categories = db.Categories.Include(a => a.Exercises);
                  return categories;
              });
        }
    }
}
