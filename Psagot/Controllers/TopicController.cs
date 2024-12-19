using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Psagot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly ITopicBL _topicBL;

        public TopicController(ITopicBL topicBL)
        {
            _topicBL = topicBL;
        }
        [HttpGet("GetAllTopics")]
        public async Task<IActionResult> GetAllTopics()
        {
            var (topics, errorMessage) = await _topicBL.GetAllTopics();
            if (topics == null) return BadRequest(errorMessage);

            return Ok(topics);
        }
    }
}

