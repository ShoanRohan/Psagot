using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Entities.DTO;
using Entities.Models;

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


        [HttpDelete("DeleteScheduleForTopic/{id}")]
        public async Task<IActionResult> DeleteScheduleForTopic([FromRoute] int id)
        {
            var (isDeleted, errorMessage) = await _ScheduleForTopicBL.DeleteScheduleForTopic(id)
            if(!isDeleted)
            {
                return NotFound (new { Message = errorMessage });
            }
        
            return Ok(new { Id = id });
        }
    }
}