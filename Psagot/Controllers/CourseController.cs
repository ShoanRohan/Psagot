using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        [HttpPost("AddCourse")]
        public async Task<IActionResult> AddCourse([FromBody] CourseDTO courseDTO)
        {
            var (addedCourse, errorMessage) = await _courseBL.AddCourse(courseDTO);
            if (addedCourse == null) return BadRequest(errorMessage);
            return Ok(addedCourse);
        }
        [HttpGet("GetInclude")]
        public async Task<IActionResult> GetInclude()
        {
            var (includes, errorMessage) = await _courseBL.GetInclude();
            if (includes == null) return BadRequest(errorMessage);
            return Ok(includes);
        }

    }
}
