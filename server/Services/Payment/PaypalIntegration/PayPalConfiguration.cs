using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using PayPal.Api;
using WebApi.Models.Configuration;

namespace WebApi.Services.Payment.PaypalIntegration
{
    
    //todo - get clientId and clientSecret from .env variables -> geneerate from
    //https://developer.paypal.com/developer/applications/
    public class PaypalConfiguration {
        
        private static PaymentConfiguration _paymentConfiguration;

        public PaypalConfiguration(IOptions<PaymentConfiguration> paymentConfiguration)
        {
            _paymentConfiguration = paymentConfiguration.Value;
        }
        private static Dictionary <string, string > GetConfig() { 
            return ConfigManager.Instance.GetProperties();  
        }  
        private static string GetAccessToken()
        {
            var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            var clientId = config["Payments:Paypal:clientId"];
            var clientSecret = config["Payments:Paypal:clientSecret"];
            return new OAuthTokenCredential(clientId, clientSecret, GetConfig()).GetAccessToken(); 
        }  
        public static APIContext GetAPIContext() {  
            
            var apiContext = new APIContext(GetAccessToken())
            {
                Config = GetConfig()
            };
            return apiContext;
        }  
    }  
}