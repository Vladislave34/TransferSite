using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.Locations;

[Table("tblCountries")]
public class CountryEntity : BaseEntity<int>
{
    [StringLength(250)]
    public string Name { get; set; }
    [StringLength(10)]
    public string Code { get; set; }

    public string Slug { get; set; } = null!;
    
    public string image { get; set; }
}