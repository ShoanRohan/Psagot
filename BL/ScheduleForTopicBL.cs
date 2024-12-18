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
    public class ScheduleForTopicBL : IScheduleForTopicBL
    {
        private readonly IScheduleForTopicDL _scheduleForTopicDL;
        private readonly IMapper _mapper;

        public ScheduleForTopicBL(IScheduleForTopicDL scheduleForTopicDL, IMapper mapper)
        {
            _scheduleForTopicDL = scheduleForTopicDL;
            _mapper = mapper;
        }

        public async Task<(ScheduleForTopicDTO ScheduleForTopic, string ErrorMessage)> GetScheduleForTopicById(int id)
        {
            var (scheduleForTopic, errorMessage) = await _scheduleForTopicDL.GetScheduleForTopicById(id);
            if (scheduleForTopic == null) return (null, errorMessage);

            return (_mapper.Map<ScheduleForTopicDTO>(scheduleForTopic), null);
        }
    }
}
