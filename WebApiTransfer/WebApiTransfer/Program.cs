using System.Text;
using System.Text.Json;
using Bogus;
using Core.Interfaces;
using Core.Models.Edentity.Account;
using Core.Services;
using Core.Services.Identity;
using Core.Services.Identity.Google;
using Domain;
using Domain.Entities.Identity;
using Domain.Entities.Locations;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using WebApiTransfer.DataSeeder;
using WebApiTransfer.Filters;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddIdentity<UserEntity, RoleEntity>(options =>
    {
        options.Password.RequireDigit = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequiredLength = 6;
        options.Password.RequiredUniqueChars = 1;
    })
    .AddEntityFrameworkStores<AppDbTransferContext>()
    .AddDefaultTokenProviders();
builder.Services.AddScoped<GoogleAuthService>();
builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateIssuerSigningKey = true,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });
var assemblyName = typeof(LoginModel).Assembly.GetName().Name;

builder.Services.AddSwaggerGen(opt =>
{
    var fileDoc = $"{assemblyName}.xml";
    var filePath = Path.Combine(AppContext.BaseDirectory, fileDoc);
    opt.IncludeXmlComments(filePath);

    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer"
    });

    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });

});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbTransferContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<ICountryService, CountryService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<ICityService, CityService>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<DbContextSeeder>();
builder.Services.AddScoped<IEmailSender, EmailSender>();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
builder.Services.AddValidatorsFromAssemblies(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddMvc(options =>
{
    options.Filters.Add<ValidationFilter>();
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowTwoDomains", policy =>
    {
        policy.WithOrigins("http://localhost:5173", 
                "http://mytransfersite12345.somee.com")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials(); // якщо потрібно передавати cookies/token
    });
});

var app = builder.Build();

app.UseCors("AllowTwoDomains");



app.UseSwagger();
app.UseSwaggerUI();

var dirImageName = builder.Configuration.GetValue<string>("DirImageName") ?? "images";


var path = Path.Combine(Directory.GetCurrentDirectory(), dirImageName);
Directory.CreateDirectory(dirImageName);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(path),
    RequestPath = $"/{dirImageName}"
});
app.UseAuthentication();
app.UseAuthorization();



app.MapControllers();

 
using (var scoped = app.Services.CreateScope())
{
    var myAppDbContext = scoped.ServiceProvider.GetRequiredService<AppDbTransferContext>();
    var roleManager = scoped.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
    var seeder = scoped.ServiceProvider.GetRequiredService<DbContextSeeder>();
    var sender = scoped.ServiceProvider.GetRequiredService<IEmailSender>();
    myAppDbContext.Database.Migrate(); 
    var roles = new[] { "User", "Admin" };
    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new RoleEntity { Name = role });
        }
    }
    if (!myAppDbContext.Users.Any())
    {
        var userManager = scoped.ServiceProvider
            .GetRequiredService<UserManager<UserEntity>>();
        var adminUser = new UserEntity
        {
            UserName = "admin@gmail.com",
            Email = "ostapchuk_vladyslav@gymnasia21.lutsk.ua",
            FirstName = "System",
            LastName = "Administrator",
            Image = "default.jpg"
        };
        var result = await userManager.CreateAsync(adminUser, "Admin123");
        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(adminUser, "Admin");
        }
        int countUsers = 100;
        var faker = new Faker("uk");
        for (int i = 0; i < countUsers; i++)
        {
            var firstName = faker.Name.FirstName();
            var lastName = faker.Name.LastName();
            var email = faker.Internet.Email(firstName, lastName);
            var user = new UserEntity
            {
                UserName = email,
                Email = email,
                FirstName = firstName,
                LastName = lastName,
                Image = "default.jpg"
            };
            var userResult = await userManager.CreateAsync(user, "User123");
            if (userResult.Succeeded)
            {
                await userManager.AddToRoleAsync(user, "User");
            }
        }
    }
    await seeder.SeedAsync();
    sender.SendEmailAsync("ostapchuk_vladyslav@gymnasia21.lutsk.ua", "Important", "Site start to work");
}



app.Run();

