using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace WebApi.Controllers.Payment
{
    public class StripeController : ControllerBase
    {
        public StripeController()
        {
            StripeConfiguration.ApiKey =
                "sk_test_51JibLGHOFtiwRajciuqu1xR9HwfPQ3PzGpGFNK0Wh9Vu0PuZZ6UxofSMWZVWvxqbeJlhsMnbU5H98AHTcYgrU8c500n3qS6URo";
        }

        public class Data
        {
            public string Url { get; set; }
        }
        
        [AllowAnonymous]
        [HttpPost("Payments/checkoutSession")]
        public ActionResult CreateCheckoutSession([FromBody] Data Url)

        {
            var successUrl = $"{Url.Url}Success";
            var cancelUrl = $"{Url.Url}Cancel";

            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string>
                {
                    "card",
                },
                LineItems = new List<SessionLineItemOptions>
                {
                    new()
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            UnitAmount = 2000,
                            Currency = "usd",
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = "T-shirt",
                            },

                        },
                        Quantity = 1,
                    },
                },
                Mode = "payment",
                SuccessUrl = successUrl,
                CancelUrl = cancelUrl,
            };

            var service = new SessionService();
            var session = service.Create(options);

            Response.Headers.Add("Location", session.Url);
            return Ok(session.Url);
        }
    }
}