using System;
using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
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
                    var port = Environment.GetEnvironmentVariable("PORT") ?? "8081";
                    var url = $"http://0.0.0.0:{port}";
                    webBuilder
                        .UseStartup<Startup>()
                        .UseUrls(url)
                        .UseContentRoot(Directory.GetCurrentDirectory());
                });
        
        
        // private static IWebHostBuilder CreateWebHostBuilder(string[] args)
        // {
        //     var config = new ConfigurationBuilder()
        //         .SetBasePath(Directory.GetCurrentDirectory())
        //         .AddJsonFile("hostsettings.json", optional: true)
        //         .AddCommandLine(args)
        //         .Build();
        //
        //     //var port = Environment.GetEnvironmentVariable("PORT") ?? "8081";
        //
        //     return WebHost.CreateDefaultBuilder(args)
        //         .UseContentRoot(Directory.GetCurrentDirectory())
        //         .UseUrls($"http://0.0.0.0:8081")
        //         .UseConfiguration(config)
        //         .UseStartup<Startup>();
        // }
    }
}
