using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("GetAllMeetings")]
        public async Task<IActionResult> GetAllMeetings()
        {
            var (meetings, errorMessage) = await _meetingBL.GetAllMeetings();
            if (meetings == null) return BadRequest(errorMessage);

            return Ok(meetings);
        }

    }
}
