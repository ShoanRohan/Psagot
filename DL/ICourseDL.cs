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
<<<<<<< HEAD
=======
        Task<(IEnumerable<Course> Courses, string ErrorMessage)> GetAllCourses();
>>>>>>> mainJM
        Task<(Course Course, string ErrorMessage)> GetCourseById(int id);
        Task<(Course Course, string ErrorMessage)> AddCourse(Course course);
        Task<(Course Course, string ErrorMessage)> UpdateCourse(Course course);

    }
}
