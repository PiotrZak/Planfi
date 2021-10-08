using WebApi.Services.Payment.PaypalIntegration;

namespace WebApi.Models.Configuration
{
    public class PaymentConfiguration
    {
        public Paypal Paypal { get; set; }
    }

    public class Paypal
    {
        public string clientId { get; set; }
        public string clientSecret { get; set; }
    }
}