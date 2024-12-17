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

        // מימוש הפונקציה GetScheduleForTopicById
        //הפונקציה מקבלת ID של COURSE ומחזירה את כל הנושאים של הקורס הספציפי הזה
        public async Task<IEnumerable<ScheduleForTopic>> GetScheduleForTopicById(int topicId)
        {
            try
            {
                // שליפת כל הרשומות שבהן TopicId מתאים
                return await _context.ScheduleForTopics
                                     .Where(s => s.TopicId == topicId)
                                     .ToListAsync();
            }
            catch (Exception ex)
            {
                // טיפול בשגיאה והחזרת מידע
                throw new Exception($"Error fetching schedule for topic ID {topicId}: {ex.Message}", ex);
            }

        }
        //הפונקציה מקבלת ID של COURSE ומחזירה את כל הנושאים של הקורס הספציפי הזה

        public async Task<IEnumerable<Topic>> GetTopicById(int courseId)
        {
            try
            {
                return await _context.Topics
                    .Where(topic => topic.CourseId == courseId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                // ניתן להוסיף לוג כאן
                throw new Exception("Error retrieving topics for course", ex);
            }
        }
    }
}
