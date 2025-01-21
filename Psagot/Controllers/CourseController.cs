using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<IActionResult> GetCourseById([FromRoute] int id)
        {
            var (course, errorMessage) = await _courseBL.GetCourseById(id);
            if (course == null) return NotFound(errorMessage);

            return Ok(course);
        }
        [HttpGet("GetAllCourses")]
        public async Task<IActionResult> GetAllCourses()
        {
            var (courses, errorMessage) = await _courseBL.GetAllCourses();
            if (courses == null) return BadRequest(errorMessage);

            return Ok(courses);
        }

    }
}