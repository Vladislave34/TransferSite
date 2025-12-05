namespace Core.Models.Edentity.Account;

public class UserProfileModel
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
}