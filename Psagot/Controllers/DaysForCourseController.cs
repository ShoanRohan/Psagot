using BL;
using DL;
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

        [HttpPost("AddDaysForCourse")]
        public async Task<IActionResult> AddDaysForCourse([FromBody]DaysForCourseRequestDTO requestDTO)
        {
            var (addedDaysForCourse, errorMessage) = await _daysForCourseBL.AddDaysForCourse(requestDTO);
            if (addedDaysForCourse == null) return BadRequest(errorMessage);

            return Ok(addedDaysForCourse);
        }

        [HttpGet("GetAllDaysForCourse")]
        public async Task<IActionResult> GetAllDaysForCourse()
        {
            var (daysForCourse, errorMessage) = await _daysForCourseBL.GetAllDaysForCourse();
            if (daysForCourse == null) return BadRequest(errorMessage);

            return Ok(daysForCourse);
        }

        [HttpPut("UpdateDaysForCourse")]
        public async Task<IActionResult> UpdateDaysForCourse([FromBody] DaysForCourseRequestDTO requestDTO)
        {
            var (updateDaysForCourse, errorMessage) = await _daysForCourseBL.UpdateDaysForCourse(requestDTO);
            if (updateDaysForCourse == null) return BadRequest(errorMessage);

            return Ok(updateDaysForCourse);
        }

        [HttpGet("GetDaysForCourseById/{id}")]
        public async Task<IActionResult> GetDaysForCourseById([FromRoute] int id)
        {
            var (dayForCourse, errorMessage) = await _daysForCourseBL.GetDaysForCourseById(id);
            if (dayForCourse == null) return NotFound(errorMessage);

            return Ok(dayForCourse);
        }

        [HttpGet("GetDaysForCourseByCourseId/{courseId}")]
        public async Task<IActionResult> GetDaysForCourseByCourseId([FromRoute] int courseId)
        {
            var (DaysForCourse, errorMessage) = await _daysForCourseBL.GetDaysForCourseByCourseId(courseId);
            if (DaysForCourse == null) return NotFound(errorMessage);

            return Ok(DaysForCourse);
        }

        [HttpDelete("DeleteDaysForCourse/{id}")]
        public async Task<IActionResult> DeleteDaysForCourse([FromRoute] int id)
        {
            var (isDeleted, errorMessage) = await _daysForCourseBL.DeleteDaysForCourse(id);
            if (!isDeleted)
                return NotFound(new { Message = errorMessage });
            return Ok(new { Id = id });

        }

        [HttpPost("CheckTopicsConflicts")]
        public async Task<IActionResult> CheckTopicsConflicts([FromBody] CheckTopicsConflictRequestDTO request)
        {
            var (hasConflicts, message) = await _daysForCourseBL.CheckTopicsConflicts(request.CourseId, request.NewDays);
            return Ok(new { hasConflicts, message });
        }

    }
}
