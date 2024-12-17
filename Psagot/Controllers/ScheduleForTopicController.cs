using BL;
using Entities.DTO;
using Entities.Models;
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


        [HttpGet("GetAllScheduleForTopics")]
        public async Task<IActionResult> GetAllScheduleForTopics()
        {
            var (scheduleForTopics, errorMessage) = await _scheduleForTopicBL.GetAllScheduleForTopics();
            if (scheduleForTopics == null) return BadRequest(errorMessage);
            return Ok(scheduleForTopics);

        }
    }
}
