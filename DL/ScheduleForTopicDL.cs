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
    public class ScheduleForTopicDL: IScheduleForTopicDL
    {
        private readonly PsagotDbContext _context;

        public ScheduleForTopicDL(PsagotDbContext context)
        {
            _context = context;
        }

        public async Task<(UserType UserType, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int id)
        {
            try
            {
                var userType = await _context.Set<UserType>().FindAsync(id);
                return (userType, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        //R.T DL TRY & CATCH
        public async Task<(IEnumerable<ScheduleForTopic> ScheduleForTopics, string ErrorMessage)> GetAllScheduleForTopics()
        {
            try
            {
                var scheduleForTopic = await _context.Set<ScheduleForTopic>().ToListAsync();
                return (scheduleForTopic, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}
