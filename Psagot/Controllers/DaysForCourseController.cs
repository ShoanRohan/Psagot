using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
    }
}
