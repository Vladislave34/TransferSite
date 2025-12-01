using Core.Models.Edentity;
using Domain.Entities.Identity;

namespace Core.Interfaces;

public interface IGoogleAuthService
{
    /// <summary>
    /// Валідує Google ID Token
    /// </summary>
    Task<GoogleUserInfo?> ValidateGoogleTokenAsync(string credential);

    /// <summary>
    /// Створює нового користувача або повертає існуючого
    /// </summary>
    Task<UserEntity> CreateOrGetUserAsync(GoogleUserInfo info);

    /// <summary>
    /// Генерує JWT для користувача
    /// </summary>
    Task<string> CreateJwtToken(UserEntity user);
}