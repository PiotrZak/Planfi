using System;
using GraphQL.Types;
using HotChocolate.Types;

namespace WebApi.GraphQl
{
    //public class AuthorType : ObjectGraphType<Author>
    public class AuthorType : ObjectType<Author>
    {
        //public AuthorType()
        //{
        //    Name = "Author";

        //    //Field(x => x.AuthorId, type: typeof(IdGraphType)).Description("Author's ID.");
        //    //Field(x => x.Name).Description("The name of the Author");
        //    //Field(x => x.Books, type: typeof(ListGraphType<BookType>)).Description("Author's books");
        //}
    }
}
