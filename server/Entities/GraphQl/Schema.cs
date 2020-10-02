using GraphQL.Types;
using WebApi.Entities.Query;

namespace Api.Graphql
{
    public class MySchema
    {
        private ISchema _schema { get; set; }
        public ISchema GraphQLSchema
        {
            get
            {
                return this._schema;
            }
        }

        public MySchema()
        {
            this._schema = Schema.For(@"
          type Exercise {
            id: ID
            name: String,
            genre: String,
            published: Date,
            Category: Category
          }

          type Category {
            id: ID,
            name: String,
            books: [Book]
          }

          type Query {
              books: [Book]
              category(id: ID): Category,
              category: [Category]
              hello: String
          }
      ", _ =>
            {
                _.Types.Include<Query>();
            });
        }

    }
}