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
        [HttpGet("GetTopicById/{id}")]
        public async Task<IActionResult> GetTopicById([FromRoute] int id)
        {
            var (topic, errorMessage) = await _topicBL.GetTopicById(id);
            if (topic == null)
            {
                return NotFound(errorMessage);
            }
            return Ok(topic);
        }

        [HttpPost("AddTopic")]
        public async Task<IActionResult> AddTopic([FromBody] TopicDTO topicDTO)
        {
            var (addTopic, errorMessage) = await _topicBL.AddTopic(topicDTO);
            if (addTopic == null) return BadRequest(errorMessage);

            return Ok(addTopic);
        }

        //הפונקציה מקבלת קורס, ומחזירה את נושאי הקורס
        [HttpGet("GetAllTopicsForCourseByCourseId/{courseId}")]
        public async Task<IActionResult> GetAllTopicsForCourseByCourseId([FromRoute] int courseId)
        {
            var (topics, errorMessage) = await _topicBL.GetAllTopicsForCourseByCourseId(courseId);
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

        [HttpDelete("DeleteTopic/{id}")]
        public async Task<IActionResult> DeleteTopic([FromRoute] int id)
        {
            var (isDeleted, errorMessage) = await _topicBL.DeleteTopic(id);

            if (!isDeleted)
            {
                return NotFound(new { Message = errorMessage });
            }

            return Ok(new { Id = id });
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

