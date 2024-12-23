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
        [HttpPut("UpdateTopic")]
        public async Task<IActionResult> UpdateTopic([FromBody] TopicDTO topicDTO)
        {
            var (updatedTopic, errorMessage) = await _topicBL.UpdateTopic(topicDTO);
            if (updatedTopic == null) return BadRequest(errorMessage);

            return Ok(updatedTopic);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTopic(int id)
        {
            var (isDeleted, errorMessage) = await _topicBL.DeleteTopic(id);

            if (!isDeleted)
            {
                return NotFound(new { Message = errorMessage });
            }

            return NoContent();
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

