﻿using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface ICourseBL
    {
        Task<(CourseDTO Course, string ErrorMessage)> AddCourse(CourseDTO courseDTO);
        Task<bool> DeleteCourse(int id);
    }
}
