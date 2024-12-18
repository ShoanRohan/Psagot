using AutoMapper;
using DL;
using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class DaysForCourseBL : IDaysForCourseBL
    {
        private readonly IDaysForCourseDL _daysForCourseDL;
        private readonly IMapper _mapper;

        public DaysForCourseBL(IDaysForCourseDL daysForCourseDL, IMapper mapper)
        {
            _daysForCourseDL = daysForCourseDL;
            _mapper = mapper;
        }

        public async Task<(bool Success, string ErrorMessage)> AddDaysForCourse(int courseId, int daysToAdd)
        {
            if (daysToAdd <= 0)

                return (false, "Number of days to add must be greater than zero.");

            var success = await _daysForCourseDL.AddDaysForCourse(courseId, daysToAdd);

            if (!success)

                return (false, "Course not found or could not update.");

            return (true, null);
        }


        public async Task<(IEnumerable<DaysForCourseDTO> DaysForCourse, string ErrorMessage)> GetAllDaysForCourse()
        {
            var (daysForCourse, errorMessage) = await _daysForCourseDL.GetAllDaysForCourse();
            if (daysForCourse == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<DaysForCourseDTO>>(daysForCourse), null);
        }

        public async Task<(DaysForCourseDTO DayForCourse, string ErrorMessage)> GetDaysForCourseById(int id)
        {
            var (daysForCourse, errorMessage) = await _daysForCourseDL.GetDaysForCourseById(id);

            if (daysForCourse == null) return (null, errorMessage);

            return (_mapper.Map<DaysForCourseDTO>(daysForCourse), null);
        }
    }
}
