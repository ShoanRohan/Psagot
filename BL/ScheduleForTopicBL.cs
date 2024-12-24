using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

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
       
        
        public async Task<(IEnumerable<ScheduleForTopicDTO> ScheduleForTopic, string ErrorMessage)> GetScheduleForTopicByTopicId(int topicId, object scheduleForTopicDTO)
        {
            var scheduleForTopic = _mapper.Map<UserType>(scheduleForTopicDTO);
            var (schedules, errorMessage) = await _scheduleForTopicDL.GetScheduleForTopicByTopicId(topicId);

            if (schedules == null)
            
                return (null, errorMessage);
            
            return (_mapper.Map<IEnumerable<ScheduleForTopicDTO>>(schedules), null);
        }

    }


}

