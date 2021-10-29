// using System.Collections.Generic;
// using Microsoft.AspNetCore.Http;
// using PayPal.Api;
// using WebApi.Interfaces;
//
// namespace WebApi.Services.Payment.PaypalIntegration
// {
//     //todo - sandboxes
//     public class PayPalProcessing : IPayPalProcesesing
//     {
//         public PayPal.Api.Payment ExecutePayment(APIContext apiContext, string payerId, string paymentId) {  
//     
//             var paymentExecution = new PaymentExecution() {  
//                 payer_id = payerId  
//             };  
//             var payment = new PayPal.Api.Payment() {  
//                 id = paymentId  
//             };  
//             return payment.Execute(apiContext, paymentExecution);  
//         }
//         
//         public PayPal.Api.Payment CreatePayment(APIContext apiContext, string redirectUrl) {  
//             
//             //todo - verify payment model -> as subscription model 
//             //todo - preecise list of boughts items
//             
//             
//             var payer = new Payer() { };  
//
//             var redirUrls = new RedirectUrls() {  
//                 cancel_url = redirectUrl + "&Cancel=true",  
//                 return_url = redirectUrl  
//             };  
//             
//             // todo possible: 
//             // Adding Tax, shipping and Subtotal details  
//             
//             var amount = new Amount() {  
//                 currency = "USD",  
//                 total = "3",
//             };  
//             var transactionList = new List <Transaction> ();  
//             // Adding description about the transaction  
//             transactionList.Add(new Transaction() {  
//                 description = "Transaction description",  
//                 invoice_number = "your generated invoice number", //Generate an Invoice No  
//                 amount = amount
//             });  
//             
//             var payment = new PayPal.Api.Payment() {  
//                 intent = "sale",  
//                 payer = payer,  
//                 transactions = transactionList,  
//                 redirect_urls = redirUrls  
//             };  
//             // Create a payment using a APIContext  
//             return payment.Create(apiContext);  
//         }  
//     }
// }