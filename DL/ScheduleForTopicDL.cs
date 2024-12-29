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

        public async Task<(IEnumerable<ScheduleForTopic>, string ErrorMessage)> GetScheduleForTopicByTopicId(int topicId)
        {
            try
            {
                var schedules = await _context.ScheduleForTopics
                    .Where(s => s.TopicId == topicId)
                    .ToListAsync();

                return (schedules, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}
