using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface IDaysForCourseBL
    {
        Task<(DaysForCourseDTO DaysForCourse, string ErrorMessage)> AddDaysForCourse(DaysForCourseRequestDTO requestDTO);
        Task<(IEnumerable<DaysForCourseDTO> DaysForCourse, string ErrorMessage)> GetAllDaysForCourse();
        Task<(DaysForCourseDTO DayForCourse, string ErrorMessage)> GetDaysForCourseById(int id);
        Task<(IEnumerable<DaysForCourseDTO> DaysForCourse, string ErrorMessage)> GetDaysForCourseByCourseId(int courseId);
        Task<(DaysForCourseDTO DaysForCourse, string ErrorMessage)> UpdateDaysForCourse(DaysForCourseRequestDTO requestDTO);
        Task<(bool IsDeleted, string ErrorMessage)> DeleteDaysForCourse(int daysForCourseId);
        Task<(bool HasConflicts, string Message)> CheckTopicsConflicts(int courseId, List<DaysForCourseRequestDTO> newDays);
    }
}
