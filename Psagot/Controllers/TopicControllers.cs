using BL;
using DL;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using Entities.DTO;


namespace API.Controllers
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

        [HttpGet("GetAllTopicsByCourseId/{courseId}")]
        public async Task<IActionResult> GetAllTopicsByCourseId([FromRoute] int courseId)
        {
            var (topics, errorMessage) = await _topicBL.GetAllTopicsByCourseId(courseId);
            if (topics == null || !topics.Any())
            {
                return BadRequest(errorMessage);
            }
            return Ok(topics);
        }
      
    }
}
