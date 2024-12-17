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
        public async Task<(ScheduleForTopic scheduleForTopic, string ErrorMessage)> UpdateScheduleForTopic(ScheduleForTopic scheduleForTopic)
        {
            try
            {
                _context.Set<ScheduleForTopic>().Update(scheduleForTopic);
                await _context.SaveChangesAsync();
                return (scheduleForTopic, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

    }
}