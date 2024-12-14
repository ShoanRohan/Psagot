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
    public class ScheduleForTopicBL : IScheduleForTopicBL
    {
        private readonly IScheduleForTopicDL _scheduleForTopicDL;
        private readonly IMapper _mapper;

        public ScheduleForTopicBL(IScheduleForTopicDL scheduleForTopicDL, IMapper mapper)
        {
            _scheduleForTopicDL = scheduleForTopicDL;
            _mapper = mapper;
        }

        public async Task<(IEnumerable<ScheduleForTopicDTO> scheduleForTopic, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int id)
        {
            var (scheduleForTopic, errorMessage) = await _scheduleForTopicDL.GetAllScheduleForTopicByTopicId(id);
            if (scheduleForTopic == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<ScheduleForTopicDTO>>(scheduleForTopic), null);
        }

    }
}
