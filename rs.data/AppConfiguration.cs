﻿using Microsoft.Extensions.Configuration;
using System.IO;

namespace rs.data
{
    public class AppConfiguration
    {
        public readonly string _connectionString = string.Empty;
        public AppConfiguration()
        {
            var configurationBuilder = new ConfigurationBuilder();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            configurationBuilder.AddJsonFile(path, false);

            var root = configurationBuilder.Build();
            _connectionString = root.GetSection("AppSettings").GetSection("DataConnection").Value;
        }
        public string ConnectionString
        {
            get => _connectionString;
        }

    }
}
