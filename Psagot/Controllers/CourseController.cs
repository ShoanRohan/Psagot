using BL;
using Entities.DTO;
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
        public async Task<IActionResult> GetCorseById([FromBody] int id)
        {
            var (Course, errorMessage) = await _courseBL.GetCourseById(id);
            if (Course == null) return NotFound(errorMessage);

            return Ok(Course);
        }
        
        [HttpPut("UpdateCourse")]
        public async Task<IActionResult> UpdateCourse([FromBody] CourseDTO course)
        {
            var (updatedCourse, errorMessage) = await _courseBL.UpdateCourse(course);
            if (updatedCourse == null) return BadRequest(errorMessage);

            return Ok(updatedCourse);
        }
        
        [HttpPost("AddCourse")]
        public async Task<IActionResult> AddCourse([FromBody] CourseDTO courseDTO)
        {
            var (addedCourse, errorMessage) = await _courseBL.AddCourse(courseDTO);
            if (addedCourse == null) return BadRequest(errorMessage);

            return Ok(addedCourse);
        }

    }
}
