using DL;
using Entities.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL
{
    // הגדרת הממשק IScheduleForTopicBL
    // הממשק מגדיר את הפעולות שצריך לממש לשכבת ה-BL עבור ה-ScheduleForTopic
    public interface IScheduleForTopicBL
    {
        public class ScheduleForTopicBL : IScheduleForTopicBL
        {
            private readonly IScheduleForTopicDL _scheduleForTopicDL;

            public ScheduleForTopicBL(IScheduleForTopicDL scheduleForTopicDL)
            {
                _scheduleForTopicDL = scheduleForTopicDL;
            }

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
        }

    }
}
