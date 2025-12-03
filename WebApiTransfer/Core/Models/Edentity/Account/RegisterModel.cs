using Microsoft.AspNetCore.Http;

namespace Core.Models.Edentity.Account;

public class RegisterModel
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public IFormFile? Image { get; set; }

    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}