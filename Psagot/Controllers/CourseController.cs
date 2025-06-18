using BL;
using DL;
using Entities.DTO;
using Entities.Models;
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

        [HttpGet("GetPaginatedFilteredCourses/{page}/{pageSize}")]
        public async Task<IActionResult> GetPaginatedFilteredCourses(
           int page, int pageSize,
       [FromQuery] int? courseId = null,
       [FromQuery] string courseName = null,
       [FromQuery] string coordinatorName = null,
       [FromQuery] int? year = null)
        {
            var (courses, totalCount, errorMessage) = await _courseBL.GetPaginatedFilteredCourses(page, pageSize, courseId, courseName, coordinatorName, year);

            if (courses != null)
                return Ok(new { courses, totalCount });

            return BadRequest(new { Error = errorMessage });
        }

        [HttpPost("AddCourse")]
        public async Task<IActionResult> AddCourse([FromBody] CourseDTO courseDTO)
        {
            var (addedCourse, errorMessage) = await _courseBL.AddCourse(courseDTO);
            if (addedCourse == null) return BadRequest(errorMessage);

            return Ok(addedCourse);
        }

        [HttpPut("UpdateCourse")]
        public async Task<IActionResult> UpdateCourse([FromBody] CourseDTO courseDTO, [FromQuery] bool confirmDeleteFutureMeetings = false)
        {
            if (confirmDeleteFutureMeetings)
            {
                var deleteError = await _courseBL.ConfirmAndDeleteFutureMeetings(courseDTO.CourseId);
                if (deleteError != null)
                {
                    return StatusCode(500, $"שגיאה בביצוע מחיקת מפגשים: {deleteError}");
                }

                var (updatedCourseAfterConfirm, errorAfterConfirm,_) = await _courseBL.UpdateCourse(courseDTO);
                if (updatedCourseAfterConfirm == null)
                {
                    return BadRequest($"שגיאה בעדכון הקורס לאחר אישור מחיקה: {errorAfterConfirm}");
                }
                return Ok(updatedCourseAfterConfirm);
            }

            var (updatedCourse, errorMessage, hasFutureMeetings) = await _courseBL.UpdateCourse(courseDTO);
            if (updatedCourse == null)
            {
                if (errorMessage != null && errorMessage.Contains("מפגשים עתידיים") && errorMessage.Contains("לאשר מחיקה"))
                {
                    return Conflict(new { message = errorMessage, requiresConfirmation = true });
                }
                return BadRequest(errorMessage);
            }
            return Ok(updatedCourse);
        }
    }
}
