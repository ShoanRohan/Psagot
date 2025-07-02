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

        public async Task<(ScheduleForTopic ScheduleForTopic, string ErrorMessage)> GetScheduleForTopicById(int id)
        {
            try
            {
                var schedule = await _context.Set<ScheduleForTopic>().FindAsync(id);
                return (schedule, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
        public async Task<(ScheduleForTopic ScheduleForTopic, string ErrorMessage)> UpdateScheduleForTopic(ScheduleForTopic scheduleForTopic)
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
    public async Task<(IEnumerable<ScheduleForTopic> ScheduleForTopic, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int topicId)
        {
            try
            {
             
                var scheduleForTopic = await _context.Set<ScheduleForTopic>().Where(s => s.TopicId == topicId)
                .ToListAsync(); ;
                return (scheduleForTopic, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(ScheduleForTopic ScheduleForTopic, string ErrorMessage)> AddScheduleForTopic(ScheduleForTopic scheduleForTopic)
        {
            try
            {
                await _context.Set<ScheduleForTopic>().AddAsync(scheduleForTopic);
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