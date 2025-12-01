namespace Core.Models.Edentity;

public class GoogleUserInfo
{
    public string Email { get; set; } = null!;
    public string GoogleId { get; set; } = null!;
    public string? FullName { get; set; }
    public string? Picture { get; set; }
}