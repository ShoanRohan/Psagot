using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Mvc;

namespace Psagot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleForTopicController : ControllerBase
    {

        private readonly IScheduleForTopicBL _scheduleForTopicBL;

        public ScheduleForTopicController(IScheduleForTopicBL scheduleForTopicBL)
        {
            _scheduleForTopicBL = scheduleForTopicBL;
        }
        [HttpPut("UpdateScheduleForTopic")]
        public async Task<IActionResult> UpdateScheduleForTopic([FromBody] ScheduleForTopicDTO scheduleForTopicDTO)
        {
            var (updatedScheduleForTopic, errorMessage) = await _scheduleForTopicBL.UpdateScheduleForTopic(scheduleForTopicDTO);
            if (updatedScheduleForTopic == null) return BadRequest(errorMessage);

            return Ok(updatedScheduleForTopic);
        }

    }
}
