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
        public async Task<(ScheduleForTopic ScheduleForTopic, string ErrorMessage)> UpdateScheduleForTopic(ScheduleForTopic ScheduleForTopic)
        {
            try
            {
                _context.Set<ScheduleForTopic>().Update(ScheduleForTopic);
                await _context.SaveChangesAsync();
                return (ScheduleForTopic, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

    }
}