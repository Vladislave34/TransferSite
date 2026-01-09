using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace WebApiTransfer.Controllers;
[Route("api/[controller]/[action]")]
[ApiController]
public class TransportationController(ITransportationService transportationService)  : ControllerBase
{
    [HttpGet]
    public async  Task<ActionResult> GetList()
    {
        var list = await transportationService.GetListAsync();
        return Ok(list);
    }
    
}