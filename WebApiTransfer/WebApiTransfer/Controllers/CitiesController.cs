using Core.Interfaces;
using Core.Models.Location;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApiTransfer.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "Admin")]
public class CitiesController(ICityService cityService) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetListAsync()
    {
        var list = await cityService.GetListAsync();
        return Ok(list);
    }

    [HttpPost("Create")]
    public async Task<IActionResult> CreateAsync([FromForm] CityCreateModel model)
    {
        var item = await cityService.CreateAsync(model);
        return Ok(item);
    }
}