﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
          var host =CreateWebHostBuilder(args).Build();
          using(var scope=host.Services.CreateScope()){

              var services=scope.ServiceProvider;   
              try{
                  var context=services.GetRequiredService<DataContext>();
                  var userManger=services.GetRequiredService<UserManager<AppUser>>();
                  context.Database.Migrate();
                  Seed.SeedData(context,userManger).Wait();
                    

              }catch(Exception ex){
                  var logger= services.GetRequiredService<ILogger<Program>>();
                  logger.LogError(ex,"an error occured");

              }
          }
          host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
