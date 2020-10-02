using System;
using System.Collections.Generic;
using System.Linq;
using HotChocolate.Types;
using WebApi.Helpers;

namespace WebApi.GraphQl
{
    public class Query
    {
        private readonly DataContext dbContext;
        public Query(DataContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public IQueryable<Author> Authors => dbContext.Authors;
        public IQueryable<Book> Books => dbContext.Books;
    }
}


