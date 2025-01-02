using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using DL;
using Entities.Models;

namespace BL
{

    public class ScheduleForTopicBL : IScheduleForTopicBL
    {
        // משתנה מסוג IScheduleForTopicDL שנחבר אליו את המימוש של שכבת ה-DL
        private readonly IScheduleForTopicDL _scheduleForTopicDL;
        private readonly IMapper _mapper;

        // בנאי של המחלקה ScheduleForTopicBL
        // הבנאי מקבל את הממשק IScheduleForTopicDL ומשתמש בו לשמירת המידע בשכבת ה-DL
        public ScheduleForTopicBL(IScheduleForTopicDL scheduleForTopicDL, IMapper mapper)
        {
            _scheduleForTopicDL = scheduleForTopicDL;
            _mapper = mapper;
        }
      
        public async Task<(IEnumerable<ScheduleForTopicDTO> Schedules, string ErrorMessage)> GetScheduleForTopicByTopicId(int topicId)
        {
            var (schedules, errorMessage) = await _scheduleForTopicDL.GetScheduleForTopicByTopicId(topicId);

            if (schedules == null)
                return (null, errorMessage);

            return (_mapper.Map<IEnumerable<ScheduleForTopicDTO>>(schedules), null);
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

