using BL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Psagot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusCourseController : ControllerBase
    {
        private readonly IStatusCourseBL _statusBL;

        public StatusCourseController(IStatusCourseBL statusBL)
        {
            _statusBL = statusBL;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllStatuses()
        {
            var (statuses, errorMessage) = await _statusBL.GetAllStatuses();
            if (statuses == null) return BadRequest(errorMessage);

            return Ok(statuses);
        }
    }

}
