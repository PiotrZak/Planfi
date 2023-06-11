using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using PlanfiApi.Data.Entities.Users;

namespace PlanfiApi.Models.ViewModels
{
  [GenerateTypeScriptInterface]
  public class Role
  {
    [Key]
    public string Id { get; set; }
    public string Name { get; set; }
    public ICollection<User> Users { get; set; }
  }
}
