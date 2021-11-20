namespace PlanfiApi.Models.ViewModels
{
    [GenerateTypeScriptInterface]
    public class CategoryViewModel
    {
        public string CategoryId { get; set; }
        public string Title { get; set; }
        public int Exercises { get; set; }
        public string OrganizationId { get; set; }
    }
}
