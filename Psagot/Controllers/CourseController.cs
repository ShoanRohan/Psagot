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
        // DELETE api/<CourseController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteCourse( int id)
        {
            try
            {
                bool isDelete = await _courseBL.DeleteCourse(id);
                return isDelete;
            }
            catch (Exception ex) { return StatusCode(500, ex.Message); }
        }

    }
}
