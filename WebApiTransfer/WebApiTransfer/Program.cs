using System.Text.Json;
using Core.Interfaces;
using Core.Services;
using Domain;
using Domain.Entities.Locations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbTransferContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<ICountryService, CountryService>();
builder.Services.AddScoped<IImageService, ImageService>();
var app = builder.Build();

app.UseCors(policy =>
    policy.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

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

app.UseAuthorization();



app.MapControllers();

using (var scoped = app.Services.CreateScope())
{
    var db = scoped.ServiceProvider.GetRequiredService<AppDbTransferContext>();

    if (!db.Countries.Any())
    {
        var jsonPath = Path.Combine(
            app.Environment.ContentRootPath,
            "..",
            "Domain",
            "countries.json"
        );

        jsonPath = Path.GetFullPath(jsonPath);

        var json = await File.ReadAllTextAsync(jsonPath);

        var countries = JsonSerializer.Deserialize<List<CountryEntity>>(
            json,
            new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

        db.Countries.AddRange(countries);
        await db.SaveChangesAsync();
    }
}


app.Run();

