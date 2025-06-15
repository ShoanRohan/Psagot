using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly IStatusBL _statusBL;

        public StatusController(IStatusBL statusBL)
        {
            _statusBL = statusBL;
        }

        [HttpGet("GetAllStatusCourses")]
        public async Task<IActionResult> GetAllStatusCourses()
        {
            var (statusCourses, errorMessage) = await _statusBL.GetAllStatusCourses();
            if (statusCourses == null) return BadRequest(errorMessage);

            return Ok(statusCourses);
        }
        [HttpGet("GetAllStatusTopics")]
        public async Task<IActionResult> GetAllStatusTopics()
        {
            var (statusTopics, errorMessage) = await _statusBL.GetAllStatusTopics();
            if (statusTopics == null) return BadRequest(errorMessage);

            return Ok(statusTopics);
        }

    }
}