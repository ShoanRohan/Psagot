<<<<<<< HEAD
﻿using Microsoft.AspNetCore.Http;
=======
﻿using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Http;
>>>>>>> ee8701327183736feeee9d3447c1bd34682ec980
using Microsoft.AspNetCore.Mvc;

namespace Psagot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
<<<<<<< HEAD



        [HttpPost]
=======
        private readonly ICourseBL _courseBL;

        public CourseController(ICourseBL courseBL)
        {
            _courseBL = courseBL;
        }

        [HttpPut("UpdateCourse")]
        public async Task<IActionResult> UpdateCourse([FromBody] CourseDTO courseDTO)
        {
            var (updatedCourse, errorMessage) = await _courseBL.UpdateCourse(courseDTO);
            if (updatedCourse == null) return BadRequest(errorMessage);

            return Ok(updatedCourse);
        }

>>>>>>> ee8701327183736feeee9d3447c1bd34682ec980
    }
}
