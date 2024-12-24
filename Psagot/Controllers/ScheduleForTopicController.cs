using BL;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Entities.DTO;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleForTopicController : ControllerBase
    {
    
        private readonly IScheduleForTopicBL _scheduleForTopicBL;

        // Constructor להזרקת תלות
        public ScheduleForTopicController(IScheduleForTopicBL scheduleForTopicBL)
        {
            _scheduleForTopicBL = scheduleForTopicBL;
        }
        [HttpGet("GetScheduleForTopicByTopicId/{topicId}")]
        public async Task<IActionResult> GetScheduleForTopicByTopicId([FromRoute] int topicId)
        {
            var (schedules, errorMessage) = await _scheduleForTopicBL.GetScheduleForTopicByTopicId(topicId);
            if (schedules == null || !schedules.Any())
                return BadRequest(errorMessage);
            return Ok(schedules);
        }

       
    }
}
