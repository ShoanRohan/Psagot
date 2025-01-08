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
        public async Task<(IEnumerable<ScheduleForTopic> ScheduleForTopics, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int topicId)
        {
            try
            {
                var scheduleForTopics = await _context.Set<ScheduleForTopic>().Where(s => s.TopicId == topicId).ToListAsync();
                return (scheduleForTopics, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(ScheduleForTopic ScheduleForTopic, string ErrorMessage)> GetScheduleForTopicById(int id)
        {
            try
            {
                var scheduleForTopic = await _context.Set<ScheduleForTopic>().FindAsync(id);
                return (scheduleForTopic, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

    }
}
