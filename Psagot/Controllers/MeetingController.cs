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
            if (meetings == null) return BadRequest(errorMessage);

            return Ok(meetings);
        }

        [HttpPost("AddMeeting")]
        public async Task<IActionResult> AddMeeting([FromBody] MeetingDTO meetingDTO)
        {
            var (addedMeeting, errorMessage) = await _meetingBL.AddMeeting(meetingDTO);
            if (addedMeeting == null) return BadRequest(errorMessage);

            return Ok(addedMeeting);
        }

        [HttpGet("GetMeetingsByRange")]
        public async Task<IActionResult> GetMeetingsByRange([FromQuery] DateOnly startDate, [FromQuery] DateOnly endDate)
        {
            if (startDate > endDate)
                return BadRequest("Start date cannot be after end date.");
            var (events, errorMessage) = await _meetingBL.GetMeetingsByRange(startDate, endDate);
            if (!string.IsNullOrEmpty(errorMessage))
                return BadRequest(errorMessage);
            if (events == null || !events.Any())
                return NoContent();
            return Ok(events);
        }

        [HttpGet("GetMeetingsByPage")]
        public async Task<IActionResult> GetMeetingsByPage([FromQuery] int page, [FromQuery] int pageSize)
        {
            var (meetings, totalCount) = await _meetingBL.GetMeetingsByPage(page, pageSize);
            return Ok(new{Meetings = meetings, TotalCount = totalCount });
        }
    }
}
