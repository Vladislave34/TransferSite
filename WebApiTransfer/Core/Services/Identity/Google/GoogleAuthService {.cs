using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Core.Interfaces;
using Core.Models.Edentity;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Core.Services.Identity.Google;

public class GoogleAuthService(UserManager<UserEntity> _userManager, RoleManager<RoleEntity> _roleManager, IConfiguration _config) 
{
    public async Task<GoogleUserInfo?> ValidateGoogleTokenAsync(string credential)
    {
        var handler = new JwtSecurityTokenHandler();
        var jwt = handler.ReadJwtToken(credential);

        string? email = jwt.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
        string? sub = jwt.Claims.FirstOrDefault(c => c.Type == "sub")?.Value;
        string? name = jwt.Claims.FirstOrDefault(c => c.Type == "name")?.Value;
        string? picture = jwt.Claims.FirstOrDefault(c => c.Type == "picture")?.Value;

        if (email == null || sub == null)
            return null;

        return new GoogleUserInfo
        {
            Email = email,
            GoogleId = sub,
            FullName = name,
            Picture = picture
        };
    }
    public async Task<UserEntity> CreateOrGetUserAsync(GoogleUserInfo info)
    {
        var user = await _userManager.FindByEmailAsync(info.Email);

        if (user == null)
        {
            user = new UserEntity()
            {
                Email = info.Email,
                UserName = info.Email,
                FirstName = info.FullName?.Split(' ').FirstOrDefault(),
                LastName = info.FullName?.Split(' ').Skip(1).FirstOrDefault(),
                Image = info.Picture,
                EmailConfirmed = true
            };

            var create = await _userManager.CreateAsync(user);
            if (!create.Succeeded)
                throw new Exception("User creation failed");

            
            if (!await _roleManager.RoleExistsAsync("User"))
                await _roleManager.CreateAsync(new RoleEntity("User"));
            
            

            await _userManager.AddToRoleAsync(user, "User");
        }
        var loginInfo = new UserLoginInfo(
            loginProvider: "Google",
            providerKey: info.GoogleId,
            displayName: "Google"
        );

        var userLogins = await _userManager.GetLoginsAsync(user);
        if (!userLogins.Any(x => x.LoginProvider == "Google" && x.ProviderKey == info.GoogleId))
        {
            await _userManager.AddLoginAsync(user, loginInfo);
        }

        return user;
    }
    public async Task<string> CreateJwtToken(UserEntity user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email!)
        };

        var roles = await _userManager.GetRolesAsync(user);
        claims.AddRange(roles.Select(r => new Claim(ClaimTypes.Role, r)));

        var key = new SymmetricSecurityKey(
            System.Text.Encoding.UTF8.GetBytes(_config["Jwt:Key"])
        );

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}