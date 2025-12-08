using System.Text.Json;
using Core.Interfaces;
using Domain;
using Domain.Entities;
using Domain.Entities.Locations;

namespace WebApiTransfer.DataSeeder;

public class DbContextSeeder(AppDbTransferContext _context, IImageService imageService)
{
    private string GetSeedFile(string fileName)
    {
        return Path.Combine(AppContext.BaseDirectory, "DataSeeder", fileName);
    }
    public async Task SeedAsync()
    {
        await SeedStatuses();
        await SeedCities();
        await SeedTransportations();
    }

    private async Task SeedStatuses()
    {
        if (_context.TransportationStatuses.Any())
            return;
        
        var filePath = GetSeedFile("transportation-statuses.json");

        var json = await File.ReadAllTextAsync(filePath);

        var items = JsonSerializer.Deserialize<List<TransportationStatusEntity>>(json)!;

        

        await _context.TransportationStatuses.AddRangeAsync(items);
        await _context.SaveChangesAsync();
    }

    private async Task SeedCities()
    {
        if (_context.Cities.Any())
            return;
        
        var filePath = GetSeedFile("cities.json");
        var json = await File.ReadAllTextAsync(filePath);

        var items = JsonSerializer.Deserialize<List<CityEntity>>(json)!;

        foreach (var item in items)
        {
            
            item.Image = await imageService.UploadImageFromUrlAsync(item.Image);
        }

        await _context.Cities.AddRangeAsync(items);
        await _context.SaveChangesAsync();
    }

    private async Task SeedTransportations()
    {
        if (_context.Transportations.Any())
            return;
        
        var filePath = GetSeedFile("transportations.json");

        var json = await File.ReadAllTextAsync(filePath);

        var items = JsonSerializer.Deserialize<List<TransportationEntity>>(json)!;

        foreach (var item in items)
        {
            
            item.ArrivalTime = DateTime.UtcNow;
            item.DepartureTime = DateTime.UtcNow;
        }

        await _context.Transportations.AddRangeAsync(items);
        await _context.SaveChangesAsync();
    }

    
}