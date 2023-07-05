using Microsoft.AspNetCore.Mvc;
using DbMigration.Domains;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.JsonPatch;

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

  [HttpPatch("{id}")]
  [ProducesResponseType(StatusCodes.Status204NoContent)]
  /*
    [
      {
        "op": "replace",
        "path": "/City",
        "value": "Melbourne"
      },
      {
        "op": "replace",
        "path": "/Region",
        "value": null
      }
    ]
  */
  public async Task<IActionResult> Patch(int id, [FromBody]JsonPatchDocument<Customer> update)
  {
    var rec = await _entities.Customers.FindAsync(id);

    if (rec == null)
    {
      return NotFound();
    }

    update.ApplyTo(rec);
    /*
    update.ApplyTo(rec, ModelState);
    if (!ModelState)
    {
      return BadRequest(ModelState)
    }
    */
    await _entities.SaveChangesAsync();

    return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(int id)
  {
    var rec = await _entities.Customers.FindAsync(id);

    if (rec == null)
    {
      return NotFound();
    }

    _entities.Remove(rec);
    await _entities.SaveChangesAsync();

    return NoContent();
  }
}
