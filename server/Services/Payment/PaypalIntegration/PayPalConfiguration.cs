using System.Collections.Generic;
using PayPal.Api;

namespace WebApi.Services.Payment.PaypalIntegration
{
    //todo - get clientId and clientSecret from .env variables -> geneerate from
    //https://developer.paypal.com/developer/applications/
    public class PaypalConfiguration {
        
        private static readonly string ClientId;
        private static readonly string ClientSecret;
        
        static PaypalConfiguration() {  
            var config = GetConfig();  
            ClientId = config["Payments.Paypal.clientId"];  
            ClientSecret = config["Payments.Paypal.clientSecret"];  
        }  

        private static Dictionary <string, string > GetConfig() { 
            return ConfigManager.Instance.GetProperties();  
        }  
        private static string GetAccessToken() {  
            
            string accessToken = new OAuthTokenCredential(ClientId, ClientSecret, GetConfig()).GetAccessToken();  
            return accessToken;  
        }  
        public static APIContext GetAPIContext() {  
            
            var config = ConfigManager.Instance.GetProperties();
            var apiContext = new APIContext(GetAccessToken())
            {
                Config = GetConfig()
            };

            return apiContext;  
        }  
    }  
}