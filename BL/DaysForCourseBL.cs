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
        private readonly IDaysForCourseDL _daysforcourseDL;
        private readonly IMapper _mapper;

        public DaysForCourseBL(IDaysForCourseDL DaysForCourseDL, IMapper mapper)
        {
            _daysforcourseDL = DaysForCourseDL;
            _mapper = mapper;
        }
        public async Task<(IEnumerable<DaysForCourseDTO> DaysForCourse, string ErrorMessage)> GetDaysForCourseByCourseId(int courseId)
        {
            var (DaysForCourse, errorMessage) = await _daysforcourseDL.GetDaysForCourseByCourseId(courseId);
            if (DaysForCourse == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<DaysForCourseDTO>>(DaysForCourse), null);
        }
    }
}
