using System;
using System.IO;
using System.Net;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace WebApi
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }
        
        private static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    var port = Environment.GetEnvironmentVariable("PORT") ?? "9001";
                    webBuilder
                        .UseStartup<Startup>()
                        .UseKestrel()
                        .ConfigureKestrel((context, options) =>
                        {
                            options.Listen(IPAddress.IPv6Any, Convert.ToInt32(port));
                        })
                        .UseContentRoot(Directory.GetCurrentDirectory());
                });
        
    }
}
