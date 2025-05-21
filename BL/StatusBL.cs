using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL
{
    public class StatusBL : IStatusBL
    {
        private readonly IStatusDL _statusDL;
        private readonly IMapper _mapper;

        public StatusBL(IStatusDL statusDL, IMapper mapper)
        {
            _statusDL = statusDL;
            _mapper = mapper;
        }

        public async Task<(IEnumerable<StatusCourseDTO> StatusCourses, string ErrorMessage)> GetAllStatusCourses()
        {
            var (statusCourses, errorMessage) = await _statusDL.GetAllStatusCourses();
            if (statusCourses == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<StatusCourseDTO>>(statusCourses), null);
        }
        public async Task<(IEnumerable<StatusTopicDTO> StatusTopic, string ErrorMessage)> GetAllStatusTopics()
        {
            var (statusTopics, errorMessage) = await _statusDL.GetAllStatusTopics();
            if (statusTopics == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<StatusTopicDTO>>(statusTopics), null);
        }
    }
}