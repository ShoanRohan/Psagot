using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL
{
    public class StatusCourseBL : IStatusCourseBL
    {
        private readonly IStatusCourseDL _statusCourseDL;
        private readonly IMapper _mapper;

        public StatusCourseBL(IStatusCourseDL statusCourseDL, IMapper mapper)
        {
            _statusCourseDL = statusCourseDL;
            _mapper = mapper;
        }

        public async Task<(IEnumerable<StatusCourseDTO> StatusCourses, string ErrorMessage)> GetAllStatusCourses()
        {
            var (statusCourses, errorMessage) = await _statusCourseDL.GetAllStatusCourses();
            if (statusCourses == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<StatusCourseDTO>>(statusCourses), null);
        }
    }
}