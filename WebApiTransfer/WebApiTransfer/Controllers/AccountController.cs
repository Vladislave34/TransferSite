using System.Diagnostics;
using Core.Interfaces;
using Core.Models.Edentity;
using Core.Models.Edentity.Account;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebApiTransfer.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class AccountController(UserManager<UserEntity> userManager,
    IJwtTokenService jwtTokenService, IUserService userService,
    IImageService imageService, RoleManager<RoleEntity> roleManager,
    IAccountService accountService) : ControllerBase
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
    
    [HttpPost]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
    {
        bool res = await userService.ForgotPasswordAsync(model);
        if (res)
            return Ok();
        else
            return BadRequest(new
            {
                Status = 400,
                IsValid = false,
                Errors = new { Email = "Користувача з такою поштою не існує" }
            });
    }
    [HttpPost]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
    {
        var isTry =  await userService.ResetPasswordAsync(model);
        if (!isTry)
        {
            return BadRequest(new
            {
                Status = 400,
                IsValid = false,
                Errors = new { Email = "Невірні дані для відновлення паролю" }
            });
        }
        return Ok();
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult> GetProfile()
    {
        var profile = await userService.GetUserProfileAsync();
        return Ok(profile);
    }
    
    [HttpGet]
    public async Task<ActionResult> Search([FromQuery] UserSearchModel model)
    {
        //Обчислення часу виконання
        Stopwatch stopwatch = new Stopwatch();
        stopwatch.Start();

        var result = await userService.SearchAsync(model);

        stopwatch.Stop();

        // Get the elapsed time as a TimeSpan value.
        TimeSpan ts = stopwatch.Elapsed;

        // Format and display the TimeSpan value.
        string elapsedTime = String.Format("{0:00}:{1:00}:{2:00}.{3:00}",
            ts.Hours, ts.Minutes, ts.Seconds,
            ts.Milliseconds / 10);
        Console.WriteLine("-----------Elapsed Time------------: " + elapsedTime);
        return Ok(result);
    }
    [HttpPost]
    public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequestModel model)
    {
        var result = await accountService.LoginByGoogle(model.IdToken);
        if (string.IsNullOrEmpty(result))
        {
            return BadRequest(new
            {
                Status = 400,
                IsValid = false,
                Errors = new { Email = "Помилка реєстрації" }
            });
        }
        return Ok(new
        {
            Token = result
        });
    }
}
