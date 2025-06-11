using Entities.Contexts;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DL
{
    public class TopicDL : ITopicDL
    {
        private readonly PsagotDbContext _context;

        public TopicDL(PsagotDbContext context)
        {
            _context = context;

        }
        public async Task<(Topic Topic, string ErrorMessage)> GetTopicById(int topicId)
        {
            try
            {
                var topic = await _context.Set<Topic>().FindAsync(topicId);

                return (topic, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }



        public async Task<(List<Topic> Topics, string ErrorMessage)> GetAllTopicsForCourseByCourseId(int courseId)
        {
            try
            {
                var topics = await _context.Topics
                           .Include(t => t.Teacher)
                           .Include(s => s.Status)
                           .Where(t => t.CourseId == courseId)
                           .ToListAsync();
                    
                return (topics, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(Topic Topic, string ErrorMessage)> UpdateTopic(Topic topic)
        {
            try
            {
                _context.Set<Topic>().Update(topic);
                await _context.SaveChangesAsync();
                return (topic, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
        public async Task<(bool IsDeleted, string ErrorMessage)> DeleteTopicAndMeetings(int topicId)
        {
            try
            {
                // מוצאים את הנושא
                var topic = await _context.Set<Topic>().FindAsync(topicId);
                if (topic == null)
                {
                    return (false, "נושא לא נמצא");
                }

                var meetings = _context.Set<Meeting>().Where(m => m.TopicId == topicId).ToList();

                _context.Set<Meeting>().RemoveRange(meetings);

                _context.Set<Topic>().Remove(topic);

                // שמירת השינויים
                await _context.SaveChangesAsync();

                return (true, null);
            }
            catch (Exception ex)
            {
                return (false, ex.Message);
            }
        }

        public async Task<(Topic Topic, string ErrorMessage)> AddTopic(Topic topic)
        {
            try
            {
                var addTopic = await _context.Set<Topic>().AddAsync(topic);
                await _context.SaveChangesAsync();
                return (addTopic.Entity, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }


        public async Task<(IEnumerable<Topic> Topics, string ErrorMessage)> GetAllTopics()
        {
            try
            {
                var topics = await _context.Set<Topic>().ToListAsync();
                return (topics, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }


    }
}
