using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace Psagot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetingController : ControllerBase
    {
        private readonly IMeetingBL _meetingBL;
        private readonly ILogger<MeetingController> _logger;

        public MeetingController(IMeetingBL meetingBL, ILogger<MeetingController> logger)
        {
            _meetingBL = meetingBL;
            _logger = logger;
        }

        [HttpPut("UpdateMeeting")]
        public async Task<IActionResult> UpdateMeeting([FromBody] MeetingDTO meetingDTO)
        {
            var (updatedMeeting, errorMessage) = await _meetingBL.UpdateMeeting(meetingDTO);
            if (updatedMeeting == null) return BadRequest(errorMessage);
            return Ok(updatedMeeting);
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

        [HttpGet("GetMeetingById/{id}")]
        public async Task<IActionResult> GetMeetingById([FromRoute] int id)
        {
            if (id <= 0) return BadRequest("Invalid meeting ID.");
            var (meeting, errorMessage) = await _meetingBL.GetMeetingById(id);
            if (meeting == null) return NotFound(errorMessage ?? "Meeting not found.");
            return Ok(meeting);
        }

        [HttpDelete("DeleteMeeting/{id}")]
        public async Task<IActionResult> DeleteMeeting([FromRoute] int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid meeting ID.");
            }

            var (deletedMeeting, errorMessage) = await _meetingBL.DeleteMeeting(id);

            if (deletedMeeting == null)
            {
                return NotFound(errorMessage ?? "Meeting not found.");
            }

            return Ok(deletedMeeting);
        }
    }
}