using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Psagot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DayController : ControllerBase
    {
        private readonly IDayBL _dayBL;

        public DayController(IDayBL dayBL)
        {
            _dayBL = dayBL;
        }

        [HttpGet("GetDayById/{id}")]
        public async Task<IActionResult> GetDayById([FromRoute] int id)
        {
            var (day, errorMessage) = await _dayBL.GetDayById(id);
            if (day == null) return NotFound(errorMessage);

            return Ok(day);
        }

        [HttpGet("GetAllDays")]
        public async Task<IActionResult> GetAllDays()
        {
            var (days, errorMessage) = await _dayBL.GetAllDays();
            if (days == null) return BadRequest(errorMessage);

            return Ok(days);
        }
    }
}

