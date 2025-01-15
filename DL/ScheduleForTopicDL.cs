using Entities.Contexts;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

        public async Task<(bool IsDeleted, string ErrorMessage)> DeleteScheduleForTopic(int TopicId)
        {
            try
            {
                var scheduleForTopic = await _context.Set<ScheduleForTopic>().FindAsync(TopicId);
                if (scheduleForTopic == null)
                {
                    return (false, "Schedule for topic not found.");
                }

                _context.Set<ScheduleForTopic>().Remove(scheduleForTopic);
                await _context.SaveChangesAsync();

                return (true, null);
            }
            catch (Exception ex)
            {
                return (false, ex.Message);
            }
        }

    }
}