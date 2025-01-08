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

        [HttpPost]
        public async Task<IActionResult> AddMeeting([FromBody] MeetingDTO meetingDTO)
        {
            var (addedMeeting, errorMessage) = await _meetingBL.AddMeeting(meetingDTO);
            if (addedMeeting == null) return BadRequest(errorMessage);

            return Ok(addedMeeting);
        }
    }
}
