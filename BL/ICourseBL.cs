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

        Task<(CourseDTO Course, string ErrorMessage)> GetCourseById(int id);
     

        Task<(CourseDTO Course, string ErrorMessage)> AddCourse(CourseDTO courseDTO);

        Task<(IEnumerable<ScheduleForTopicDTO> ScheduleForTopicsDTO, string ErrorMessage)> GetInclude();
    }
}
