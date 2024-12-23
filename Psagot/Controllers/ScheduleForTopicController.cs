using DL;
using Entities.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Psagot.Controllers
{
    public class ScheduleForTopicController
    {
        private readonly IScheduleForTopicDL _scheduleForTopicDL;

        // Constructor להזרקת תלות
        public ScheduleForTopicController(IScheduleForTopicDL scheduleForTopicDL)
        {
            _scheduleForTopicDL = scheduleForTopicDL;
        }

        public async Task<(IEnumerable<ScheduleForTopic>, string)> GetScheduleForTopicByTopicId(int topicId)
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
