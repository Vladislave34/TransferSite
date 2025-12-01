using Core.Interfaces;
using Core.Models.Edentity;
using Core.Services.Identity.Google;
using Microsoft.AspNetCore.Mvc;

namespace WebApiTransfer.Controllers;


    [ApiController]
    [Route("api/auth/google")]
    public class GoogleAuthController : ControllerBase
    {
        private readonly GoogleAuthService _google;

        public GoogleAuthController(GoogleAuthService google)
        {
            _google = google;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] GoogleLoginRequest request)
        {
            var info = await _google.ValidateGoogleTokenAsync(request.Credential);

            if (info == null)
                return BadRequest("Invalid Google token");

            var user = await _google.CreateOrGetUserAsync(info);

            var jwt = await _google.CreateJwtToken(user);

            return Ok(new { token = jwt });
        }
    }
