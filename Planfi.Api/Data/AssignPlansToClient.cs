namespace PlanfiApi.Data
{
    public class AssignPlansToClient
    {
        public AssignPlansToClient()
        {
            ClientIds = new string[] { };
            PlanIds = new string[] { };
        }

        public string[] ClientIds { get; set; }
        public string[] PlanIds { get; set; }
    }
}