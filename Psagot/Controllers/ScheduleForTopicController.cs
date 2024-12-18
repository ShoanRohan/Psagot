using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Psagot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleForTopicController : ControllerBase
    {
        private readonly IScheduleForTopicBL _ScheduleForTopicBL;
        public ScheduleForTopicController(IScheduleForTopicBL scheduleForTopicBL)
        {
            _ScheduleForTopicBL = scheduleForTopicBL;
        }
        [HttpGet("GetAllScheduleForTopic")]
        public async Task<IActionResult> GetAllScheduleForTopic()
        {
            var (scheduleForTopic, errorMessage) = await _ScheduleForTopicBL.GetAllScheduleForTopics();
            if (scheduleForTopic == null) return BadRequest(errorMessage);

            return Ok(scheduleForTopic);
        }
    }
}
