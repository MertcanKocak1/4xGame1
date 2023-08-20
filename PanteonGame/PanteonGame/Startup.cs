﻿using BusinessLayer.Abstract;
using BusinessLayer.Concrete;
using DataAccessLayer.Abstract.Repository;
using DataAccessLayer.Concrete.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OData;
using Entities.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Entities.Configurations;
using Microsoft.Extensions.Options;
using Entities.Building;
using MongoDB.Bson;
using DataAccessLayer.MongoDb;
using MongoDB.Driver;

namespace PanteonGame
{
    public partial class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Identity Configuration
            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            // PostgreSql Connection
            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("PostgreSqlConnection")));

            // MongoDb Settings Configuration
            services.Configure<MongoDbSettings>(Configuration.GetSection("ConnectionStrings:MongoConnection"));
            services.Configure<MongoDbSettings>(options =>
            {
                options.ConnectionString = Configuration.GetConnectionString("MongoConnection");
                options.DatabaseName = Configuration["MongoDatabaseName"];
            });
            services.AddSingleton<IMongoDbSettings>(serviceProvider =>
            serviceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value);

                    services.AddScoped<IMongoClient>(serviceProvider =>
                    {
                        var settings = serviceProvider.GetRequiredService<IMongoDbSettings>();
                        return new MongoClient(settings.ConnectionString);
                    });

            // JWT Authentication Configuration
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtSettings:SecretKey"])),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                };
            });

            // JWT Settings Configuration
            services.Configure<JwtSettings>(Configuration.GetSection("JwtSettings"));

            // Other services
            services.AddScoped<IMongoRepository<Building, ObjectId>, MongoRepository<Building, ObjectId>>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<ILogService, LogManager>();
            services.AddScoped<IJwtService, JwtManager>();
            services.AddScoped<IBuildingService, BuildingManager>();

            // Controllers and OData Configuration
            services.AddControllers(opt => opt.EnableEndpointRouting = false)
                .AddOData(opt => opt.AddRouteComponents("odata", GetEdmModel()).EnableQueryFeatures());
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
