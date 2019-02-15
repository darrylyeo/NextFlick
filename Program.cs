using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace nextflick
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // BuildWebHost
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseWebRoot("frontend/dist/nextflick")
                .ConfigureLogging(logging => logging.SetMinimumLevel(LogLevel.Warning))
                .Build()
                .Run();
        }
    }
}
