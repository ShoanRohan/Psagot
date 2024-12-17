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
    public class TopicDL:ITopicDL
    {
        private readonly PsagotDbContext _context;

        public TopicDL(PsagotDbContext context)
        {
            _context = context;
        }
        public async Task<(List<Topic> topics, string ErrorMessage)> GetAllTopicsForCourseByCourseId(int id)
        {
            try
            {
                var topics = await _context.Set<Topic>()
                                           .Where(topic => topic.CourseId == id)
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
