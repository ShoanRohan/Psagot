<<<<<<< HEAD
﻿using Entities.DTO;

=======
﻿using DL;
using Entities.DTO;
>>>>>>> mainJM
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface ICourseBL
    {
<<<<<<< HEAD

        Task<(CourseDTO Course, string ErrorMessage)> GetCourseById(int id);
     

=======
        Task<(IEnumerable<CourseDTO> Courses, string ErrorMessage)> GetAllCourses();
        Task<(CourseDTO Course, string ErrorMessage)> GetCourseById(int id);
>>>>>>> mainJM
        Task<(CourseDTO Course, string ErrorMessage)> AddCourse(CourseDTO courseDTO);
        Task<(CourseDTO Course, string ErrorMessage)> UpdateCourse(CourseDTO courseDTO);

    }
}
