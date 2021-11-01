using System;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using PlanfiApi.Models;

namespace PlanfiApi.Services.Account
{

    public interface IEmailService
    {
        Task<int> SendEmail(EmailMessage message);
        Task<int> Send(EmailMessage messageData);
    }


    public class EmailService : IEmailService
    {
        private readonly EmailConfiguration _emailConfig;


        public EmailService(EmailConfiguration emailConfig)
        {
            _emailConfig = emailConfig;
        }


        public async Task<int> SendEmail(EmailMessage message)
        {
            try
            {
                await Send(message);
                return 1;
            }
            catch (Exception e)
            {
                return await Task.FromException<int>(new InvalidOperationException());
            }
        }


		public async Task<int> Send(EmailMessage emailMessage)
		{
            try
            {
                var message = new MimeMessage();

                if (emailMessage.FromAddresses == null)
                {
                    if (emailMessage.FromAddresses != null)
                    {
                        emailMessage.FromAddresses[0].Name = "Planfi";
                        emailMessage.FromAddresses[0].Address = "planfi.contact@gmail.com";
                    }
                }

                message.To.AddRange(emailMessage.ToAddresses.Select(x => new MailboxAddress(x.Name, x.Address)));
                message.From.AddRange(emailMessage.FromAddresses.Select(x => new MailboxAddress(x.Name, x.Address)));


                message.Subject = emailMessage.Subject;
                //We will say we are sending HTML. But there are options for plaintext etc. 
                message.Body = new TextPart(TextFormat.Html)
                {
                    Text = emailMessage.Content
                };

                //Be careful that the SmtpClient class is the one from Mailkit not the framework!
                using var emailClient = new SmtpClient();
                //The last parameter here is to use SSL (Which you should!)
                await emailClient.ConnectAsync(_emailConfig.SmtpServer, _emailConfig.Port, SecureSocketOptions.StartTls);

                //Remove any OAuth functionality as we won't be using it. 
                emailClient.AuthenticationMechanisms.Remove("XOAUTH2");
                await emailClient.AuthenticateAsync(_emailConfig.Username, _emailConfig.Password);
                await emailClient.SendAsync(message);
                await emailClient.DisconnectAsync(true);
                return 1;
            }
            catch(Exception e)
            {
                return await Task.FromException<int>(new Exception(e.ToString()));
            }
        }
	}
}
