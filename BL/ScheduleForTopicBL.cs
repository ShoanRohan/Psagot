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
      
        public async Task<(ScheduleForTopicDTO Schedule, string ErrorMessage)> GetScheduleForTopicById(int id)
        {
            var (schedule, errorMessage) = await _scheduleForTopicDL.GetScheduleForTopicById(id);

            if (schedule == null)
                return (null, errorMessage);

            return (_mapper.Map<ScheduleForTopicDTO >(schedule), null);
        }


        public async Task<(ScheduleForTopicDTO ScheduleForTopic, string ErrorMessage)> UpdateScheduleForTopic(ScheduleForTopicDTO scheduleForTopicDTO)
        {
            var scheduleForTopic = _mapper.Map<ScheduleForTopic>(scheduleForTopicDTO);
            var (updatedScheduleForTopic, errorMessage) = await _scheduleForTopicDL.UpdateScheduleForTopic(scheduleForTopic);

            if (updatedScheduleForTopic == null) return (null, errorMessage);

            return (_mapper.Map<ScheduleForTopicDTO>(updatedScheduleForTopic), null);
        }


       
        public async Task<(IEnumerable<ScheduleForTopicDTO> ScheduleForTopics, string ErrorMessage)> GetAllScheduleForTopics()
        {
            var (scheduleForTopics, errorMessage) = await _scheduleForTopicDL.GetAllScheduleForTopics();
            if (scheduleForTopics == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<ScheduleForTopicDTO>>(scheduleForTopics), null);
        }


        public async Task<(IEnumerable<ScheduleForTopicDTO> ScheduleForTopic, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int topicId)
        {
            var (scheduleForTopic, errorMessage) = await _scheduleForTopicDL.GetAllScheduleForTopicByTopicId(topicId);
            if (scheduleForTopic == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<ScheduleForTopicDTO>>(scheduleForTopic), null);
        }
    }


}

