using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusCourseController : ControllerBase
    {
        private readonly IStatusCourseBL _statusCourseBL;

        public StatusCourseController(IStatusCourseBL statusCourseBL)
        {
            _statusCourseBL = statusCourseBL;
        }

        [HttpGet("GetAllStatusCourses")]
        public async Task<IActionResult> GetAllStatusCourses()
        {
            var (statusCourses, errorMessage) = await _statusCourseBL.GetAllStatusCourses();
            if (statusCourses == null) return BadRequest(errorMessage);

            return Ok(statusCourses);
        }

    }
}