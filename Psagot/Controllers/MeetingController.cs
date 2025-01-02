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
        public async Task<IActionResult> AddNewMeeting([FromBody] MeetingDTO meetingDTO)
        {
            var (addedMeeting, errorMessage) = await _meetingBL.AddNewMeeting(meetingDTO);
            if (addedMeeting == null) return BadRequest(errorMessage);

            return Ok(addedMeeting);

          
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
