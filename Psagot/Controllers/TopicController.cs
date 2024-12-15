using BL;
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

        [HttpGet("GetAllTopicsForCourseByCourseId/{id}")]
        public async Task<IActionResult> GetAllTopicsForCourseByCourseId([FromRoute] int id)
        {
            var (topics, errorMessage) = await _topicBL.GetAllTopicsForCourseByCourseId(id);
            if (topics == null || !topics.Any()) return NotFound(errorMessage);

            return Ok(topics);
        }

    }
}
