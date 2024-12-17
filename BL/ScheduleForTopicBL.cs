using AutoMapper;
using DL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DL;
using Entities.Models;
using Entities.DTO;

namespace BL
{
    // הגדרת המחלקה ScheduleForTopicBL
    // מחלקה זו אחראית ללוגיקה העסקית עבור ה-ScheduleForTopic
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


        public async Task<(IEnumerable<ScheduleForTopicDTO> ScheduleForTopic, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int TopicId)
        {
            var (ScheduleForTopic, errorMessage) = await _scheduleForTopicDL.GetAllScheduleForTopicByTopicId(TopicId);
            if (ScheduleForTopic == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<ScheduleForTopicDTO>>(ScheduleForTopic), null);
        }
    }
}

