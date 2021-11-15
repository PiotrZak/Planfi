namespace PlanfiApi.Models.SqlProjections
{
    public class UserSqlProjection
    {
        public string User_Id { get; set; }
        public string Role { get; set; }
        public byte[]? Avatar { get; set; }
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public string Email { get; set; }
        public string Phone_Number { get; set; }
        public string Organization_Id { get; set; }
        public bool Is_Activated { get; set; }
    }
}