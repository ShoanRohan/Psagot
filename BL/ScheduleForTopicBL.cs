using AutoMapper;
using DL;
using Entities.Models;
using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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


        public async Task<(ScheduleForTopicDTO ScheduleForTopic, string ErrorMessage)> DeleteScheduleForTopic(int TopicId)
        {
            var (ScheduleForTopic, errorMessage) = await _scheduleForTopicDL.DeleteScheduleForTopic(TopicId);
            if (ScheduleForTopic == null) return (null, errorMessage);

            return (_mapper.Map<ScheduleForTopicDTO>(ScheduleForTopic), null);
        }


    }
}