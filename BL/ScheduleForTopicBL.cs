using AutoMapper;
using DL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DL;
using Entities.Models;

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
        }//הפונקציה מקבלת ID של TOPIC ושולפת את כל המערכת עבורו
        public async Task<IEnumerable<ScheduleForTopic>> GetScheduleForTopicById(int topicId)
        {
            try
            {
                return await _scheduleForTopicDL.GetScheduleForTopicById(topicId);
            }
            catch (Exception ex)
            {
                // ניהול שגיאות (אפשר להחזיר הודעה מפורטת יותר או לזרוק את השגיאה הלאה)
                throw new Exception($"Error in BL while fetching schedule for topic ID {topicId}: {ex.Message}", ex);
            }
        }

       
        //הפונקציה מקבלת ID של COURSE ומחזירה את כל הנושאים של הקורס הספציפי הזה
        public async Task<IEnumerable<Topic>> GetTopicById(int courseId)
        {
            return await _scheduleForTopicDL.GetTopicById(courseId);
        }
    }
}

