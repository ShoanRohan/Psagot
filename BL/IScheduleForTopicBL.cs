using Entities.DTO;
using Entities.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL
{
    // ממשק שמגדיר את הפעולות עבור ScheduleForTopic
    public interface IScheduleForTopicBL
    {
       // הפונקציה מקבלת ID של TOPIC ושולפת את כל המערכת עבורו
        Task<(IEnumerable <ScheduleForTopic>,string ErrorMessage)> GetScheduleForTopicByTopicId(int topicId);

        


    }
}
