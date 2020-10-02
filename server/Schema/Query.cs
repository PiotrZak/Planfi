using System;
using GraphQL.Types;

namespace WebApi.Entities.Query
{
    public class Query : ObjectGraphType
    {
        public Query()
        {
            Name = "Query";
            //Field<CategoryQuery>("category", resolve: context => new { });
        }
    }
}
