using BL;
using Entities.DTO;
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

        [HttpPut("UpdateMeeting")]
        public async Task<IActionResult> UpdateMeeting([FromBody] MeetingDTO meetingDTO)
        {
            var (updatedMeeting, errorMessage) = await _meetingBL.UpdateMeeting(meetingDTO);

            if (updatedMeeting == null) return BadRequest(errorMessage);

            return Ok(updatedMeeting);
        }

    }
}
