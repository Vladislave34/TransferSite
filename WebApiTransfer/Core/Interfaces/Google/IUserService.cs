using Domain.Entities.Identity;

namespace Core.Interfaces;

public interface IUserService
{
    Task<UserEntity> FindByEmailAsync(string email);
    Task<UserEntity> CreateUserAsync(UserEntity user, string role = "User");
    Task AddLoginAsync(UserEntity user, string loginProvider, string providerKey);
    Task AddToRoleAsync(UserEntity user, string role);
    Task<string> GenerateJwtAsync(UserEntity user);
}