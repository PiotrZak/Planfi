using GraphQL.Types;
namespace WebApi.Entities.Types
{
    public class CategoryTypeQL : ObjectGraphType<CategoryQL>
    {
        public CategoryTypeQL()
        {
            Field(m => m.CategoryId);
            Field(m => m.Title);
        }
    }
}
