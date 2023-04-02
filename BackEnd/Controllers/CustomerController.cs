using Microsoft.AspNetCore.Mvc;
using DbMigration.Domains;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Controllers;

[ApiController]
[Route("[controller]")]
// public class CustomerController : ControllerBase
public class CustomerController : Controller
{
  private readonly ILogger<WeatherForecastController> _logger;
  private readonly Entities _entities;

  public CustomerController(
    ILogger<WeatherForecastController> logger
    , Entities entities
  )
  {
      _logger = logger;
      _entities = entities;
  }

  [HttpPost]
  [ProducesResponseType(StatusCodes.Status201Created)]
  public async Task<IActionResult> Post(Customer newRecord)
  {
    _entities.Customers.Add(newRecord);
    await _entities.SaveChangesAsync();
    Response.StatusCode = StatusCodes.Status201Created;
    return Json(new { newRecord.CustomerId });
  }

  [HttpGet]
  public async Task<IActionResult> Get()
  {
    var output = await _entities.Customers
      .AsNoTracking()
      .ToListAsync();
    // Response.StatusCode = StatusCodes.Status200OK;
    return Json(output);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> Get(int id)
  {
    var output = await _entities.Customers.FindAsync(id);

    if (output == null)
    {
      return NotFound();
    }
    else
    {
      return Json(output);
    }
  }
}
