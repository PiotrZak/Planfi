using System.Collections.Generic;

namespace WebApi.Models
{
	public class EmailMessage
	{

        public class EmailAddress
		{
			public string Name { get; set; }
			public string Address { get; set; }
		}

		public EmailMessage()
		{
			ToAddresses = new List<EmailAddress>();
            FromAddresses = new List<EmailAddress>();
        }

        public List<EmailAddress> ToAddresses { get; set; }
        public List<EmailAddress> FromAddresses { get; set; }
        public string Subject { get; set; }
		public string Content { get; set; }
	}
}
