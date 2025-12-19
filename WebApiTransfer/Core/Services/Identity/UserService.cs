using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces;
using Core.Models.Edentity.Account;
using Domain;
using Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Core.Services.Identity;

public class UserService(IAuthService authService, IMapper mapper, AppDbTransferContext appDbTransferContext,  IConfiguration configuration,
    IEmailSender smtpService, UserManager<UserEntity> userManager) : IUserService
{
    public async Task<UserProfileModel> GetUserProfileAsync()
    {
        var userId = await authService.GetUserIdAsync();
        var user = await appDbTransferContext.Users.Where(x => x.Id == userId).ToListAsync();
        var profile = await appDbTransferContext.Users
            .ProjectTo<UserProfileModel>(mapper.ConfigurationProvider)
            .SingleOrDefaultAsync(u => u.Id == userId!);
        return profile!;
    }

    public async Task<bool> ForgotPasswordAsync(ForgotPasswordModel model)
    {
        var user = await userManager.FindByEmailAsync(model.Email);

        if (user == null)
        {
            return false;
        }

        string token = await userManager.GeneratePasswordResetTokenAsync(user);
        var resetLink = $"{configuration["ClientUrl"]}/reset-password?token={Uri.EscapeDataString(token)}&email={Uri.EscapeDataString(model.Email)}";


        var To = model.Email;
        var Subject = "Password Reset";
        var Body = $"<p>Click the link below to reset your password:</p><a href='{resetLink}'>Reset Password</a>";
        

        await smtpService.SendEmailAsync(To, Subject, Body);

        return true;
    }

    public async Task<bool> ResetPasswordAsync(ResetPasswordModel model)
    {
        var user = await userManager.FindByEmailAsync(model.Email);

        if (user != null)
        {
            var result = await userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);
            if (!result.Succeeded)
            {
                return false;
            }
        }
        else
            return false;

        return true;
    }
}