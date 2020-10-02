using System;
using System.Linq;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;
using WebApi.Helpers;

namespace WebApi.GraphQl
{
    //public class AuthorQuery : ObjectGraphType
    //{
    //    public AuthorQuery(DataContext db)
    //    {
    //        Field<AuthorType>(
    //          "Author",
    //          arguments: new QueryArguments(
    //            new QueryArgument<IdGraphType> { Name = "id", Description = "The ID of the Author." }),
    //          resolve: context =>
    //          {
    //              var id = context.GetArgument<int>("id");
    //              var author = db
    //          .Authors
    //          .Include(a => a.Books)
    //          .FirstOrDefault(i => i.AuthorId == id);
    //              return author;
    //          });

    //        Field<ListGraphType<AuthorType>>(
    //          "Authors",
    //          resolve: context =>
    //          {
    //              var authors = db.Authors.Include(a => a.Books);
    //              return authors;
    //          });
    //    }
    //}
}
