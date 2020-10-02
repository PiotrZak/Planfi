using System;
using GraphQL;
using WebApi.Helpers;

namespace WebApi.GraphQl
{
    [GraphQLMetadata("Mutation")]
    public class Mutation
    {
        [GraphQLMetadata("addAuthor")]
        public Author Add(string name)
        {
            using (var db = new DataContext())
            {
                var author = new Author() { Name = name };
                db.Authors.Add(author);
                db.SaveChanges();
                return author;
            }
        }
    }
}
