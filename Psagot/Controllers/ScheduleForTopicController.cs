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

        [HttpGet("GetAllScheduleForTopicByTopicId/{id}")]
        public async Task<IActionResult> GetAllScheduleForTopicByTopicId([FromRoute] int id)
        {
            var (scheduleForTopic, errorMessage) = await _ScheduleForTopicBL.GetAllScheduleForTopicByTopicId(id);
            if (scheduleForTopic == null) return NotFound(errorMessage);

            return Ok(scheduleForTopic);
        }
    }
}
