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
      public async Task<(IEnumerable<Topic> Topics, string ErrorMessage)> GetAllTopicsByCourseId(int courseId)
        {
            try
            {
                var topic = await _context.Topics
                    .Where(t => t.CourseId == courseId)
                    .ToListAsync();

                return (topic, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
       


    }
}
