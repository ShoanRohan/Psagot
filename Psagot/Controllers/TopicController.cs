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

        [HttpPost("AddTopic")]
        public async Task<IActionResult> AddTopic([FromBody] TopicDTO topicDTO)
        {
            var (addTopic, errorMessage) = await _topicBL.AddTopic(topicDTO);
            if (addTopic == null) return BadRequest(errorMessage);

            return Ok(addTopic);
        }
    }
}
