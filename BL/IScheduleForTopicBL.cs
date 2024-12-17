using Entities.DTO;
using Entities.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    // הגדרת הממשק IScheduleForTopicBL
    // הממשק מגדיר את הפעולות שצריך לממש לשכבת ה-BL עבור ה-ScheduleForTopic
    public interface IScheduleForTopicBL
    {
        Task<(IEnumerable<ScheduleForTopicDTO> ScheduleForTopic, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int TopicId);
    }
}
