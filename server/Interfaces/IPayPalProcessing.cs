using PayPal.Api;

namespace WebApi.Interfaces
{
    public interface IPayPalProcesesing
    {
        Payment ExecutePayment(APIContext apiContext, string payerId, string paymentId);
        Payment CreatePayment(APIContext apiContext, string redirectUrl);
    }
}