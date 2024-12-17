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



        [HttpGet("GetAllScheduleForTopicByTopicId/{topicId}")]
        public async Task<IActionResult> GetAllScheduleForTopicByTopicId([FromRoute] int topicId)
        {
            var (ScheduleForTopic, errorMessage) = await _scheduleForTopicBL.GetAllScheduleForTopicByTopicId(topicId);
            if (ScheduleForTopic == null) return NotFound(errorMessage);

            return Ok(ScheduleForTopic);
        }

    }
}
