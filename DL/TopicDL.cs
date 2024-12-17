using Entities.Contexts;
using Entities.Models;
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


    }
}
