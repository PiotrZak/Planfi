namespace WebApi.Entities
{
    public class Role
    {
        public string Name;
    }
    
    public class PossibleRoles
    {
        public const string User = "User";
        public const string Trainer = "Trainer";
        public const string Owner = "Owner";
        public const string Admin = "Admin";
        public string Name;
    }
    
}