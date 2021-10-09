using System;
using System.Linq;
using System.Threading.Tasks;
using Stripe;

namespace WebApi.Services.Payment.StripeIntegration
{
    public class StripeConfiguration
    {
        private async Task ConfigureStripe(StripeConfiguration stripeConfiguration)
        {
            var productService = new ProductService();
            var planService = new Stripe.PlanService();

            var products = await productService.ListAsync();
            var plans = await planService.ListAsync();

            foreach (var product in stripeConfiguration.Products.ToList())
            {
                if (!products.Any(x => x.Name.Equals(product.Name, StringComparison.InvariantCultureIgnoreCase)))
                {
                    var productOptions = new ProductCreateOptions
                    {
                        Name = product.Name,
                        StatementDescriptor = product.StatementDescription,
                        Metadata = product.Metadata,
                        Type = "service"
                    };

                    var newProduct = await productService.CreateAsync(productOptions);
                    product.Id = newProduct.Id;
                }

                foreach (var plan in product.Plans)
                {
                    if (!plans.Any(x => x.Nickname.Equals(plan.Name)))
                    {
                        await planService.CreateAsync(new PlanCreateOptions
                        {
                            Nickname = plan.Name,
                            Amount = plan.PricePerUnit,
                            TrialPeriodDays = plan.TrialPeriod,
                            Metadata = plan.Metadata,
                            Interval = "month",
                            Currency = "chf"
                        });
                    }
                }
            }
        }
    }
}