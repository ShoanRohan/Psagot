﻿using BL;
using Entities.DTO;
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
        [HttpGet("GetPaginatedCourses/{page}/{pageSize}")]
        public async Task<IActionResult> GetPaginatedCourses(int page, int pageSize)
        {
            var (courses, totalCount, errorMessage) = await _courseBL.GetPaginatedCourses(page, pageSize);
            if (courses == null) return BadRequest(errorMessage);

            return Ok(new { courses, totalCount });
        }
        [HttpPost("AddCourse")]
        public async Task<IActionResult> AddCourse([FromBody] CourseDTO courseDTO)
        {
            var (addedCourse, errorMessage) = await _courseBL.AddCourse(courseDTO);
            if (addedCourse == null) return BadRequest(errorMessage);

            return Ok(addedCourse);
        }
        [HttpPut("UpdateCourse")]
        public async Task<IActionResult> UpdateCourse([FromBody] CourseDTO courseDTO)
        {
            var (updatedCourse, errorMessage) = await _courseBL.UpdateCourse(courseDTO);
            if (updatedCourse == null) return BadRequest(errorMessage);

            return Ok(updatedCourse);
        }

    }
}
