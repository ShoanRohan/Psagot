using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public interface ICourseDL
    {
        Task<(IEnumerable<Course> Courses, string ErrorMessage)> GetAllCourses();
        Task<(Course Course, string ErrorMessage)> GetCourseById(int id);
        int GetTotalCoursesCount();
        Task<(IEnumerable<Course> Courses, string ErrorMessage)> GetPaginatedCourses(int skip, int pageSize);
        Task<(Course Course, string ErrorMessage)> AddCourse(Course course);
        Task<(Course Course, string ErrorMessage)> UpdateCourse(Course course);
        Task<(IEnumerable<Course> Courses, string ErrorMessage)> GetFilteredCourses(
         int? courseId ,
         string courseName ,
         string coordinatorName,
         int? year );

    }
}
