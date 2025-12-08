using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.Locations;

[Table("tblTransportationStatus")]
public class TransportationStatusEntity : BaseEntity<int>
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; } =  string.Empty;
    
    public ICollection<TransportationEntity>? Transportations { get; set; }
    
    
}