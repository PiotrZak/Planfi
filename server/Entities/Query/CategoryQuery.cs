using System;
using GraphQL.Types;
using WebApi.Entities.Types;

namespace WebApi.Entities.Query
{
    public class CategoryQuery
    {
        public CategoryQuery(ICategoryQLService service)
        {
            //FieldAsync<CategoryTypeQL, CategoryQL>(
            //    "single",
            //    arguments: new QueryArguments(
            //        new QueryArgument<IntGraphType> { Name = "CategoryId" }
            //    ),
            //    resolve: context =>
            //    {
            //        var id = context.GetArgument<int>("CategoryId");
            //        return service.GetAsync(id);
            //    }
            //);
            //FieldAsync<ResultsType<MovieType, Movie>, Results<Movie>>(
            //    "search",
            //    arguments: new QueryArguments(
            //        new QueryArgument<StringGraphType> { Name = "query" }
            //    ),
            //    resolve: context =>
            //    {
            //        var query = context.GetArgument<string>("query");
            //        return service.ListAsync(query);
            //    }
            //);
        }
    }
}
