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

        [HttpGet("GetAllDaysForCourse")]
        public async Task<IActionResult> GetAllDaysForCourse()
        {
            var (daysForCourse, errorMessage) = await _daysForCourseBL.GetAllDaysForCourse();
            if (daysForCourse == null) return BadRequest(errorMessage);

            return Ok(daysForCourse);
        }
    }
}
