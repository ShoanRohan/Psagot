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
