using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Psagot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DaysForCourseController : ControllerBase
    {
        private readonly IDaysForCourseBL _daysforcourseBL;
        public DaysForCourseController(IDaysForCourseBL daysforcourseBL)
        {
            _daysforcourseBL = daysforcourseBL;
        }

        [HttpGet("GetDaysForCourseByCourseId/{courseId}")]
        public async Task<IActionResult> GetDaysForCourseByCourseId([FromRoute] int courseId)
        {
            var (DaysForCourse, errorMessage) = await _daysforcourseBL.GetDaysForCourseByCourseId(courseId);
            if (DaysForCourse == null) return NotFound(errorMessage);

            return Ok(DaysForCourse);
        }
    }
}
