using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Security.Configurations;
using RegionalAnimalHealth.Infrastructure.Configurations;
using RegionalAnimalHealth.Infrastructure.Identity;
using RegionalAnimalHealth.Infrastructure.Persistence;
using RegionalAnimalHealth.Infrastructure.Persistence.Interceptors;
using RegionalAnimalHealth.Infrastructure.Services;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    private const string ConnectionStringIdentifier = "DefaultConnection";

    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddScoped<AuditableEntitySaveChangesInterceptor>();

        if (configuration.GetValue<bool>("UseInMemoryDatabase"))
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseInMemoryDatabase("RegionalAnimalHealthDb"));
        }
        else
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString(ConnectionStringIdentifier),
                    builder => builder.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
        }

        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

        services.AddScoped<ApplicationDbContextInitialiser>();

        services
            .AddDefaultIdentity<ApplicationUser>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

        services.AddSingleton(new RawDbConnectionString(configuration.GetConnectionString(ConnectionStringIdentifier)));

        var emailConfig = configuration.GetSection("EmailConfiguration")
            .Get<EmailConfiguration>();
        services.AddSingleton<EmailConfiguration>(emailConfig);

        services.AddTransient<IDateTime, DateTimeService>();
        services.AddTransient<IIdentityService, IdentityService>();
        services.AddTransient<IEmailService, EmailService>();
        services.AddTransient<IApplicationRawDbContext, ApplicationRawDbContext>();

        // Disable Identity Server
        //services.AddIdentityServer()
        //    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

        //services.AddAuthentication()
        //    .AddIdentityServerJwt();

        AuthorizationConfiguration jwtConfig = new();
        configuration.Bind(AuthorizationConfiguration.ConfigurationName, jwtConfig);
        services.AddSingleton(sp => jwtConfig);

        var key = Encoding.ASCII.GetBytes(jwtConfig.Secret);
        services.AddAuthentication(options =>
        {
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

        services.AddAuthorization(options =>
            options.AddPolicy("CanPurge", policy => policy.RequireRole("Administrator")));

        return services;
    }
}
