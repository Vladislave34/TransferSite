using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace Core.Models.Location;

public class CountryEditModel
{
    
    public int Id { get; set; }

    
    public string Name { get; set; } = null!;

    
    [StringLength(2, MinimumLength = 2)]
    public string Code { get; set; } = null!;

    
    public string Slug { get; set; } = null!;
    public IFormFile? image { get; set; }
}