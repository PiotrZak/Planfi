//using System;
//using System.Collections.Generic;
//using System.Linq;
//using GraphQL;
//using GraphQL.Types;
//using WebApi.GraphQl;
//using System.Web.Mvc;
//using Microsoft.AspNetCore.Mvc;

//namespace WebApi.GraphQl
//{
//    public class GraphSchema : Schema
//    {
//        public GraphSchema(IDependencyResolver resolver) :
//           base(resolver)
//        {
//            Query = resolver.Resolve<RootQuery>();
//        }
//    }
//}


//public class RootQuery : ObjectGraphType
//{
//    public RootQuery()
//    {
//        Field<ListGraphType<BookType>>("books", resolve:
//    context => GetBooks());
//        Field<BookType>("book",
//            arguments: new QueryArguments(
//                new QueryArgument<IdGraphType> { Name = "id" }
//                ), resolve: context =>
//                {
//                  var id = context.GetArgument<int>("id");
//                  return GetBooks().FirstOrDefault(x => x.Id == id);
//                });
//    }

//    static List<Book> GetBooks()
//    {
//        var books = new List<Book>{
//            new Book {
//                        Id = 1 ,
//                        Name = "Fullstack tutorial for GraphQL" ,
//                        Chapters = 356
//                    },
//            new Book
//                    {
//                        Id = 2 ,
//                        Name = "Introductory tutorial to GraphQL" ,
//                        Chapters = 10
//                    },
//            new Book
//                    {
//                        Id = 3 ,
//                        Name= "GraphQL Schema Design for the Enterprise" ,
//                        Chapters= 25
//                    }
//        };

//        return books;
//    }
//}