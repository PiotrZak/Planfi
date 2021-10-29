using System;
using System.IO;
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
                    var url = $"http://0.0.0.0:{port}";
                    
                    webBuilder
                        .UseStartup<Startup>()
                        .UseUrls(url)
                        .UseContentRoot(Directory.GetCurrentDirectory());
                });
        
    }
}
