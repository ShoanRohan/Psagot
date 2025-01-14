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
        [HttpPost("AddCourse")]
        public async Task<IActionResult> AddCourse([FromBody] CourseDTO courseDTO)
        {
            var (addedCourse, errorMessage) = await _courseBL.AddCourse(courseDTO);
            if (addedCourse == null) return BadRequest(errorMessage);

            return Ok(addedCourse);
        }

    }
}
