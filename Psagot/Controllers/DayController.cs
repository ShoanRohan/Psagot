using BL;
using Entities.DTO;
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

        [HttpPost("AddDay")]
        public async Task<IActionResult> AddDay([FromBody] DayDTO dayDTO)
        {
            var (addedDay, errorMessage) = await _dayBL.AddDay(dayDTO);
            if (addedDay == null) return BadRequest(errorMessage);

            return Ok(addedDay);
        }

        [HttpPut("UpdateDay")]
        public async Task<IActionResult> UpdateDay([FromBody] DayDTO dayDTO)
        {
            var (updatedDay, errorMessage) = await _dayBL.UpdateDay(dayDTO);
            if (updatedDay == null) return BadRequest(errorMessage);

            return Ok(updatedDay);
        }

    }
}

