using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Psagot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DaysForCourseController : ControllerBase
    {
        private readonly IDaysForCourseBL _daysForCourseBL;

        public DaysForCourseController(IDaysForCourseBL daysForCourseBL)
        {
            _daysForCourseBL = daysForCourseBL;
        }


        [HttpGet("AddDaysForCourse")]
        public async Task<IActionResult> AddDaysForCourse([FromQuery] int courseId, [FromQuery] int daysToAdd)
        {
            var (success, errorMessage) = await _daysForCourseBL.AddDaysForCourse(courseId, daysToAdd);

            if (!success) return BadRequest(errorMessage);

            return Ok("Days added successfully.");
        }

        [HttpGet("GetAllDaysForCourse")]
        public async Task<IActionResult> GetAllDaysForCourse()
        {
            var (daysForCourse, errorMessage) = await _daysForCourseBL.GetAllDaysForCourse();
            if (daysForCourse == null) return BadRequest(errorMessage);

            return Ok(daysForCourse);
        }

        [HttpGet("GetDaysForCourseById/{id}")]
        public async Task<IActionResult> GetDaysForCourseById([FromRoute] int id)
        {
            var (dayForCourse, errorMessage) = await _daysForCourseBL.GetDaysForCourseById(id);
            if (dayForCourse == null) return NoContent();

            return Ok(dayForCourse);
        }

        [HttpGet("GetDaysForCourseByCourseId/{courseId}")]
        public async Task<IActionResult> GetDaysForCourseByCourseId([FromRoute] int courseId)
        {
            var (DaysForCourse, errorMessage) = await _daysForCourseBL.GetDaysForCourseByCourseId(courseId);
            if (DaysForCourse == null) return NotFound(errorMessage);

            return Ok(DaysForCourse);
        }
    }
}
