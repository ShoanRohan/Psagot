using Entities.Contexts;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
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

        public async Task<(IEnumerable<Topic>, string)> GetTopicById(int courseId)
        {
            try
            {
                // שליפת כל הנושאים של הקורס מה-DB
                var topics = await _context.Topics
                    .Where(t => t.CourseId == courseId)
                    .ToListAsync();

                // אם לא נמצאו נושאים
                if (topics == null || !topics.Any())
                {
                    return (null, "No topics found for the specified course ID.");
                }

                // החזרת הנושאים
                return (topics, null);
            }
            catch (Exception ex)
            {
                // טיפול בשגיאות
                return (null, $"An error occurred: {ex.Message}");
            }
        }
    }
}
