using DL;
using Entities.DTO;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface ICourseBL
    {
        Task<(IEnumerable<CourseDTO> Courses, string ErrorMessage)> GetAllCourses();
        Task<(CourseDTO Course, string ErrorMessage)> GetCourseById(int id);
        Task<(CourseDTO Course, string ErrorMessage)> AddCourse(CourseDTO courseDTO);
        Task<(CourseDTO Course, string ErrorMessage)> UpdateCourse(CourseDTO courseDTO);
        Task<(IEnumerable<CourseDTO> Courses, int TotalCount, string ErrorMessage)> GetPaginatedFilteredCourses(
            int page, int pageSize, int? courseId, string courseName, string coordinatorName, int? year);
    }

}