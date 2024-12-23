using Entities.Contexts;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DL
{
    public class ScheduleForTopicDL : IScheduleForTopicDL
    {
        private readonly PsagotDbContext _context;

        public ScheduleForTopicDL(PsagotDbContext context)
        {
            _context = context;
        }

        public async Task<(IEnumerable<ScheduleForTopic>, string)> GetScheduleForTopicByTopicId(int topicId)
        {
            try
            {
                // שליפת לוחות זמנים עבור Topic ID מה-DB
                var schedules = await _context.ScheduleForTopics
                    .Where(s => s.TopicId == topicId)
                    .ToListAsync();

                // אם אין תוצאות
                if (schedules == null || !schedules.Any())
                {
                    return (null, "No schedules found for the specified topic ID.");
                }

                // החזרת התוצאות
                return (schedules, null);
            }
            catch (Exception ex)
            {
                // טיפול בשגיאה
                return (null, $"An error occurred: {ex.Message}");
            }
        }
    }
}
