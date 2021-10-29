// using System.Collections.Generic;
// using System.Threading.Tasks;
// using Stripe;
// using PlanfiApi.Helpers;
//
// namespace PlanfiApi.Services.Payment.StripeIntegration
// {
//     public interface IStripeProcessing
//     {
//         Task<Tenant> AddTenant(Tenant tenantInput);
//         Task<string> CreateCustomer(string email, string fullName);
//         Task AddSubscription(string customerId, string planId);
//         // Task AddStripeTokenToCustomer(string customerId, string stripeToken);
//     }
//     
//     public class StripeProcessing : IStripeProcessing
//     {
//         private readonly CustomerService _customerService;
//         private readonly SubscriptionService _subscriptionService;
//         private readonly DataContext _dbContext;
//
//         public StripeProcessing(DataContext dbContext, CustomerService customerService, SubscriptionService subscriptionService)
//         {
//             _dbContext = dbContext;
//             _customerService = customerService;
//             _subscriptionService = subscriptionService;
//         }
//
//         public async Task<Tenant> AddTenant(Tenant tenantInput)
//         {
//             var tenant = new Tenant
//             {
//                 Name = tenantInput.Name,
//                 Street = tenantInput.Street,
//                 Zip = tenantInput.Zip,
//                 City = tenantInput.City,
//                 Country = tenantInput.Country,
//                 Email = tenantInput.Email,
//                 WebAddress = tenantInput.WebAddress,
//                 Phone = tenantInput.Phone,
//                 Mobile = tenantInput.Mobile
//             };
//
//             var customer = new CustomerCreateOptions
//             {
//                 Name = tenantInput.Name,
//                 Email = tenantInput.Email,
//                 Phone = tenantInput.Phone,
//             };
//
//             // This creates the new stripe customer using the Stripe.NET nuget package
//             tenant.StripeCustomerId = await _customerService.CreateAsync(customer);
//
//             _dbContext.Tenants.Add(tenant);
//             await _dbContext.SaveChangesAsync();
//
//             return tenant;
//         }
//
//         public async Task<string> CreateCustomer(string email, string fullName)
//         {
//             var response = await _customerService.CreateAsync(new CustomerCreateOptions
//             {
//                 Email = email,
//                 Description = fullName
//             });
//
//             return response.Id;
//         }
//         
//         public async Task AddSubscription(string customerId, string planId)
//         {
//             await _subscriptionService.CreateAsync(new SubscriptionCreateOptions
//             {
//                 Customer = customerId,
//                 Items = new List<SubscriptionItemOptions>
//                 {
//                     new() { Quantity = 1 }
//                 },
//                 TrialFromPlan = true
//             });
//         }
//         
//         // public async Task AddStripeTokenToCustomer(string customerId, string stripeToken)
//         // {
//         //     await _customerService.UpdateAsync(customerId, new CustomerUpdateOptions
//         //     {
//         //         SourceToken = stripeToken
//         //     });
//         // }
//     }
//
//     public class Tenant
//     {
//         public string Name { get; set; }
//         public string Street { get; set; }
//         public string Zip { get; set; }
//         public string City { get; set; }
//         public string Country { get; set; }
//         public string Email { get; set; }
//         public string WebAddress { get; set; }
//         public string Phone { get; set; }
//         public string Mobile { get; set; }
//         public Customer StripeCustomerId { get; set; }
//     }
// }