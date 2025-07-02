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
    public class StatusCourseBL : IStatusCourseBL
    {
        private readonly IStatusCourseDL _statusDL;
        private readonly IMapper _mapper;

        public StatusCourseBL(IStatusCourseDL statusDL, IMapper mapper)
        {
            _statusDL = statusDL;
            _mapper = mapper;
        }

        public async Task<(IEnumerable<StatusCourseDTO> Statuses, string ErrorMessage)> GetAllStatuses()
        {
            var (statuses, errorMessage) = await _statusDL.GetAllStatuses();
            if (statuses == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<StatusCourseDTO>>(statuses), null);
        }
    }

}
