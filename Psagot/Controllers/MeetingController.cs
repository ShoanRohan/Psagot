using BL;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Psagot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetingController : ControllerBase
    {
        private readonly IMeetingBL _meetingBL;

        public MeetingController(IMeetingBL meetingBL)
        {
            _meetingBL = meetingBL;
        }

        // Get a meeting by ID
        [HttpGet("GetMeetingById/{id}")]
        public async Task<IActionResult> GetMeetingById([FromRoute] int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid meeting ID.");
            }

            var (meeting, errorMessage) = await _meetingBL.GetMeetingById(id);
            if (meeting == null)
            {
                return NotFound(errorMessage ?? "Meeting not found.");
            }

            return Ok(meeting);
        }
    }
}
