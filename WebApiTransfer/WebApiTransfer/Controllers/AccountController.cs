using Core.Interfaces;
using Core.Models.Edentity.Account;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebApiTransfer.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountController(UserManager<UserEntity> userManager,
    IJwtTokenService jwtTokenService, IImageService imageService, RoleManager<RoleEntity> roleManager) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var user = await userManager.FindByEmailAsync(model.Email);
        if (user == null || !await userManager.CheckPasswordAsync(user, model.Password))
        {
            return Unauthorized("Invalid email or password.");
        }
        var token = await jwtTokenService.CreateAsync(user);
        return Ok(new { token });
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromForm] RegisterModel model)
    {
        var ExstingUser = await userManager.FindByEmailAsync(model.Email);
        if (ExstingUser != null)
        {
            
            return BadRequest("User already exists." + ExstingUser.Email);
            
        }

        var user = new UserEntity()
        {
            UserName = model.Email,
            Email = model.Email,
            FirstName = model.FirstName,
            LastName = model.LastName,
        };
        var image = await imageService.UploadImageAsync(model.Image);
        user.Image = image;
        var result = await userManager.CreateAsync(user, model.Password);
        
        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }
        if (!await roleManager.RoleExistsAsync("User"))
            await roleManager.CreateAsync(new RoleEntity("User"));
            
            

        await userManager.AddToRoleAsync(user, "User");
        
        var token = await jwtTokenService.CreateAsync(user);
        
        
        return Ok(new { token });

    }
}
