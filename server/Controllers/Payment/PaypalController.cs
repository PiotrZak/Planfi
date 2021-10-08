using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PayPal.Api;
using WebApi.Interfaces;
using WebApi.Services.Payment.PaypalIntegration;

namespace WebApi.Controllers.Payment
{
    //more info: https://www.c-sharpcorner.com/article/paypal-payment-gateway-integration-in-asp-net-mvc/
    public static class SessionHelper
    {
        public static void SetObjectAsJson(this ISession session, string key, object value)
        {
            session.SetString(key, JsonConvert.SerializeObject(value));
        }

        public static T GetObjectFromJson<T>(this ISession session, string key)
        {
            var value = session.GetString(key);
            return value == null ? default(T) : JsonConvert.DeserializeObject<T>(value);
        }
    }
    
    public class PaypalController : ControllerBase
    {
        private readonly IPayPalProcesesing _payPalProcessing;
        private readonly APIContext _apiContext = PaypalConfiguration.GetAPIContext();

        public PaypalController(IPayPalProcesesing payPalProcessing)
        {
            _payPalProcessing = payPalProcessing;
        }
        
        [HttpPost("payment")]
        public async Task<IActionResult>  PaymentWithPaypal(string cancel = null) {
            try {
            
                var allParams = Request.Query.Concat(Request.Form)
                    .ToDictionary(p => p.Key, p => p.Value);
                
                var payerId = Request.Query["PayerID"];
                
                if (string.IsNullOrEmpty(payerId)) {
                    
                    var baseUrl = $"{HttpContext.Request.Scheme}://{HttpContext.Request.Host}";
                    var guid = Convert.ToString((new Random()).Next(100000));  

                    var createdPayment = _payPalProcessing.CreatePayment(_apiContext, baseUrl + "guid=" + guid);

                    using var links = createdPayment.links.GetEnumerator();  
                    string paypalRedirectUrl = null;  
                    while (links.MoveNext()) {  
                        var lnk = links.Current;  
                        if (lnk != null && lnk.rel.ToLower().Trim().Equals("approval_url")) {
                            paypalRedirectUrl = lnk.href;  
                        }  
                    }  
                    // saving the paymentID in the key guid  
                    SessionHelper.SetObjectAsJson(HttpContext.Session, "paymentId", createdPayment.id);
                    return Redirect(paypalRedirectUrl);  
                } else {
                    //var guid = Request.Query["guid"];  
                    var paymentId = SessionHelper.GetObjectFromJson<string>(HttpContext.Session, "paymentId");
                    var executedPayment = _payPalProcessing.ExecutePayment(_apiContext, payerId, paymentId);
                    
                    
                    if (executedPayment.state.ToLower() != "approved") {  
                        return new OkObjectResult("failed");
                    }  
                }  
            } catch (Exception ex) {  
                //throw excepction
            }  
            //show success page
            return new OkObjectResult("success");
        }  
    }
}