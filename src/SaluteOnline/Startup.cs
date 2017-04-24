﻿using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using IdentityServer4.Models;
using IdentityServer4.Services.InMemory;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using NLog.Extensions.Logging;
using NLog.Web;
using SaluteOnline.DAL;
using SaluteOnline.Domain.Enums;
using SaluteOnline.Services;
using SaluteOnline.Services.Declarations;

namespace SaluteOnline
{
    public class Startup
    {
        private readonly string _contentRootPath;
        public Startup(IHostingEnvironment env)
        {
            _contentRootPath = env.ContentRootPath;
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", true, true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("SaluteOnlineDefaultConnection");
            if (connectionString.Contains("%CONTENTROOTPATH%"))
            {
                connectionString = connectionString.Replace("%CONTENTROOTPATH%", _contentRootPath);
            }
            services.AddDbContext<SaluteOnlineDbContext>(
                options => options.UseSqlServer(connectionString));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddSingleton<IProtocolsService, ProtocolsService>();
            services.AddTransient<IPasswordHasher<Domain.User.MongoUser>, PasswordHasher<Domain.User.MongoUser>>();
            services.AddAuthorization(
                options =>
                {
                    options.AddPolicy(Role.User.ToString(), policyUser => policyUser.RequireClaim("role", Role.User.ToString()));
                    options.AddPolicy(Role.Admin.ToString(), policyUser => policyUser.RequireClaim("role", Role.Admin.ToString()));
                    options.AddPolicy(Role.SilentDon.ToString(), policyUser => policyUser.RequireClaim("role", Role.SilentDon.ToString()));
                    options.AddPolicy("AdminAndUser", policyUser => policyUser.RequireClaim("role", Role.User.ToString(), Role.Admin.ToString()));
                    options.AddPolicy("AllAuthorized", policyUser => policyUser.RequireClaim("role", Role.User.ToString(), Role.Admin.ToString(), Role.SilentDon.ToString()));
                });
            services.AddCors(
                options =>
                    options.AddPolicy("AllowAll",
                        builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
            services.AddMvc();
            services.AddIdentityServer()
                .AddInMemoryStores()
                .AddInMemoryClients(new List<Client>())
                .AddInMemoryScopes(new List<Scope>())
                .AddInMemoryUsers(new List<InMemoryUser>())
                .SetTemporarySigningCredential();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddNLog();
            env.ConfigureNLog("nlog.config");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseIdentityServer();
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            app.UseIdentityServerAuthentication(new IdentityServerAuthenticationOptions
            {
                Authority = "http://localhost:9657/",
                ScopeName = "SaluteOnlineApi",
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                RequireHttpsMetadata = false
            });
            app.UseCors("AllowAll");
            app.UseMvc();
        }
    }
}
