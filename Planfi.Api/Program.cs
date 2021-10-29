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
                    webBuilder
                        .UseStartup<Startup>()
                        .UseUrls("http://*:9001","https://*:9001")
                        .UseKestrel()
                        .ConfigureKestrel((context, options) =>
                        {
                            var port = Convert.ToInt32(Environment.GetEnvironmentVariable("PORT") ?? "9001");
                            options.Listen(IPAddress.Any, port);
                        })
                        .UseContentRoot(Directory.GetCurrentDirectory());
                });
        
        }
    }

