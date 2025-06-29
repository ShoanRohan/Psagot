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

        private string GetFullErrorMessage(Exception ex)
        {
            var messages = new List<string>();
            while (ex != null)
            {
                messages.Add(ex.Message);
                ex = ex.InnerException;
            }
            return string.Join(" --> ", messages);
        }

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

        public async Task<(Topic Topic, string ErrorMessage)> UpdateTopic(Topic topic , bool forceUpdate)
        {
            try
            {
                //var existingTopic = await _context.Topics
                //    .Include(t => t.Meetings)
                //    .FirstOrDefaultAsync(t => t.TopicId == topic.TopicId);

                var existingTopic = await _context.Set<Topic>().FindAsync(topic.TopicId);


                if (existingTopic == null)
                    return (null, "Topic not found");

                bool isStatusChangedFromActive = existingTopic.StatusId == 1 && topic.StatusId != 1;

                if (isStatusChangedFromActive)
                {
                    //var today = DateOnly.FromDateTime(DateTime.Now);
                    //var futureMeetings = existingTopic.Meetings
                    //    .Where(m => m.MeetingDate > today)
                    //    .ToList();

                    if ((existingTopic.NumberOfMeetings ?? 0) > 0 && !forceUpdate)
                    {
                        return (null, "לנושא קיימים מפגשים עתידיים. במקרה של שינוי הסטטוס, מפגשים אלו ימחקו. האם להמשיך?");
                    }


                    var schedules = await _context.Set<ScheduleForTopic>()
                  .Where(s => s.TopicId == existingTopic.TopicId)
                  .ToListAsync();
                    // מחיקת השיבוצים
                    if (schedules.Any())
                    {
                        _context.Set<ScheduleForTopic>().RemoveRange(schedules);
                    }
                    // שליפת המפגשים של הנושא
                    var meetings = await _context.Set<Meeting>()
                        .Where(m => m.TopicId == existingTopic.TopicId)
                        .ToListAsync();
                    // מחיקת המפגשים
                    if (meetings.Any())
                    {
                        _context.Set<Meeting>().RemoveRange(meetings);
                    }
                }

                _context.Entry(existingTopic).CurrentValues.SetValues(topic);

                await _context.SaveChangesAsync();
                return (existingTopic, null);
            }
            catch (Exception ex)
            {
                return (null, "שגיאה בעדכון נושא: " + ex.Message);
            }
        }
        public async Task<(bool IsDeleted, string ErrorMessage)> DeleteTopicAndMeetings(int topicId)
        {
            try
            {
                // שליפת הנושא
                var topic = await _context.Set<Topic>().FindAsync(topicId);
                if (topic == null)
                {
                    return (false, "נושא לא נמצא");
                }
                // שליפת שיבוצים ללו"ז לנושא
                var schedules = await _context.Set<ScheduleForTopic>()
                    .Where(s => s.TopicId == topicId)
                    .ToListAsync();
                // מחיקת השיבוצים
                if (schedules.Any())
                {
                    _context.Set<ScheduleForTopic>().RemoveRange(schedules);
                }
                // שליפת המפגשים של הנושא
                var meetings = await _context.Set<Meeting>()
                    .Where(m => m.TopicId == topicId)
                    .ToListAsync();
                // מחיקת המפגשים
                if (meetings.Any())
                {
                    _context.Set<Meeting>().RemoveRange(meetings);
                }
                // מחיקת הנושא
                _context.Set<Topic>().Remove(topic);
                // שמירת השינויים
                await _context.SaveChangesAsync();
                return (true, null);
            }
            catch (Exception ex)
            {
                var errorMessage = ex.InnerException?.Message ?? ex.Message;
                return (false, $"שגיאה במחיקת הנושא: {errorMessage}");
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
