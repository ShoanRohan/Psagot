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
      public async Task<(IEnumerable<Topic> Topics, string ErrorMessage)> GetTopicById(int courseId)
        {
            try
            {
                var topics = await _context.Topics
                    .Where(t => t.CourseId == courseId)
                    .ToListAsync();

                return (topics, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

    }
}
