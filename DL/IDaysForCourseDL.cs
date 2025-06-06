﻿using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public interface IDaysForCourseDL
    {
        Task<(DaysForCourse DaysForCourse, string ErrorMessage)> AddDaysForCourse(DaysForCourse daysForCourse);
        Task<(IEnumerable<DaysForCourse> DaysForCourse, string ErrorMessage)> GetAllDaysForCourse();
        Task<(DaysForCourse DayForCourse, string ErrorMessage)> GetDaysForCourseById(int id);
        Task<(IEnumerable<DaysForCourse> DaysForCourse, string ErrorMessage)> GetDaysForCourseByCourseId(int courseId);
        Task<(DaysForCourse DaysForCourse, string ErrorMessage)> UpdateDaysForCourse(DaysForCourse daysForCourse);
    }
}
