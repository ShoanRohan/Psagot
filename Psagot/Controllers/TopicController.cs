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

        [HttpGet("GetAllTopicsForCourseByCourseId/{id}")]
        public async Task<IActionResult> GetAllTopicsForCourseByCourseId([FromRoute] int id)
        {
            var (topics, errorMessage) = await _topicBL.GetAllTopicsForCourseByCourseId(id);
            if (topics == null || !topics.Any()) return NotFound(errorMessage);

            return Ok(topics);
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

