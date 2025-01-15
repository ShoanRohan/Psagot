using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;
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

        public async Task<(bool Success, string ErrorMessage)> AddDaysForCourse(DaysForCourseDTO daysForCourseDTO)
        {
            DaysForCourse daysForCourse = _mapper.Map<DaysForCourseDTO, DaysForCourse>(daysForCourseDTO);
            return await _daysForCourseDL.AddDaysForCourse(daysForCourse);
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

        public async Task<(IEnumerable<DaysForCourseDTO> DaysForCourse, string ErrorMessage)> GetDaysForCourseByCourseId(int courseId)
        {
            var (DaysForCourse, errorMessage) = await _daysForCourseDL.GetDaysForCourseByCourseId(courseId);
            if (DaysForCourse == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<DaysForCourseDTO>>(DaysForCourse), null);
        }
    }
}
