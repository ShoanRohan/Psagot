using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BL;
using Entities.DTO;
using System.Threading.Tasks;

namespace Psagot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseBL _courseBL;


        public CourseController(ICourseBL courseBL)
        {
            _courseBL = courseBL;
        }

        [HttpGet("GetCourseById/{id}")]
        public async Task<IActionResult> GetCorseById([FromBody] int id)
        {
            var (Course, errorMessage) = await _courseBL.GetCourseById(id);
            if (Course == null) return NotFound(errorMessage);

            return Ok(Course);
        }
    }
}
