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

        Task<(CourseDTO Course, string ErrorMessage)> GetCoursebById(int id);
       Task<(Course Course, string errorMessage)> GetCourseById(int id);

    }
}
