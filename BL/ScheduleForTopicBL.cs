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
        public ScheduleForTopicBL(IScheduleForTopicDL scheduleForTopicDL)
        {
            _scheduleForTopicDL = scheduleForTopicDL;
        }
        //הפונקציה מקבלת ID של TOPIC ושולפת את כל המערכת עבורו

        public async Task<(IEnumerable<ScheduleForTopic>, string ErrorMessage)> GetScheduleForTopicByTopicId(int topicId)
        {
            // קריאה ל-DL לקבלת מערכת עבור ה-Topic
            var (schedules, errorMessage) = await _scheduleForTopicDL.GetScheduleForTopicByTopicId(topicId);

            // אם לא נמצא מערכת  או שיש שגיאה
            if (schedules == null || !schedules.Any())
            {
                return (null, errorMessage ?? "No schedules found for the specified topic ID.");
            }

            // אם המערכת נמצאה בהצלחה, מחזירים את הרשימה יחד עם null להודעת שגיאה
            return (schedules, null);
        }





    }
}

