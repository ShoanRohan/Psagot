using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Http;
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

        [HttpPut("UpdateMeeting")]
        public async Task<IActionResult> UpdateMeeting([FromBody] MeetingDTO meetingDTO)
        {
            var (updatedMeeting, errorMessage) = await _meetingBL.UpdateMeeting(meetingDTO);

            if (updatedMeeting == null) return BadRequest(errorMessage);

            return Ok(updatedMeeting);
        }

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


        [HttpGet("GetAllMeetings")]
        public async Task<IActionResult> GetAllMeetings()
        {
            var (meetings, errorMessage) = await _meetingBL.GetAllMeetings();


            [HttpGet("GetAllMeetings")]
            public async Task<IActionResult> GetAllMeetings()
            {
                var (meetings, errorMessage) = await _meetingBL.GetAllMeetings();
                if (meetings == null) return BadRequest(errorMessage);

                return Ok(meetings);
            }
            if (meetings == null) return BadRequest(errorMessage);

            return Ok(meetings);
        }
    }
}
