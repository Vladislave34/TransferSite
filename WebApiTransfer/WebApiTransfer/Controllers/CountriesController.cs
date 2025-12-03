using Core.Interfaces;
using Core.Models.Location;
using Core.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApiTransfer.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize(Roles = "Admin")]
public class CountriesController(ICountryService countryService) : ControllerBase
{
    [HttpGet]
    [AllowAnonymous]
    public async Task<ActionResult> GetCountries()
    {
        
        var countries = await countryService
            .GetListAsync();
        return Ok(countries); // код 200
        
    }

    [HttpGet("{id}")]

    public async Task<ActionResult> GetCountry(int id)
    {
        var country = await countryService.GetByIdAsync(id);
        return Ok(country);
    }

    [HttpPost("Create")]
    public async Task<ActionResult> CreateAsync([FromForm] CountryCreateModel model)
    {
        var item = await countryService.CreateAsync(model);
        return CreatedAtAction(null, item);
    }
    
    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await countryService.DeleteAsync(id);
        return Ok();
        
    }

    [HttpPut("Edit")]
    public async Task<ActionResult> EditAsync([FromForm] CountryEditModel model)
    {
        var item = await countryService.EditAsync(model);
        return CreatedAtAction(null, item);
    }
}