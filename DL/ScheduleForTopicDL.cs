using Entities.Contexts;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
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


        public async Task<(ScheduleForTopic ScheduleForTopic, string ErrorMessage)> DeleteScheduleForTopic(int TopicId)
        {
            try
            {
                var scheduleForTopic = await _context.Set<ScheduleForTopic>().FindAsync(TopicId);
                if (scheduleForTopic == null)
                {
                    return (null, "Schedule for topic not found.");
                }

                _context.Set<ScheduleForTopic>().Remove(scheduleForTopic);
                await _context.SaveChangesAsync();

                return (scheduleForTopic, null);
            }
            catch (Exception ex)
            {
                return (null, $"An error occurred: {ex.Message}");
            }
        }

    }
}
       

        public async Task<(IEnumerable<ScheduleForTopic> scheduleForTopics, string ErrorMessage)> GetAllScheduleForTopics()
        {
            try
            {
                var scheduleForTopics = await _context.Set<ScheduleForTopic>().ToListAsync();
                return (scheduleForTopics, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}
