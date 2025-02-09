using Entities.DTO;
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
        Task<(Course Course, string ErrorMessage)> AddCourse(Course course);
        Task<(Course Course, string ErrorMessage)> UpdateCourse(Course course);

    }
}
