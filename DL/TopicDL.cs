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

        Task<(Topic Topic, string ErrorMessage)> ITopicDL.AddTopic(Topic topic)
        {
            throw new NotImplementedException();
        }

        Task<(IEnumerable<Topic> Topics, string ErrorMessage)> ITopicDL.GetAllTopic()
        {
            throw new NotImplementedException();
        }

        Task<(Topic Topic, string ErrorMessage)> ITopicDL.GetTopicById(int id)
        {
            throw new NotImplementedException();
        }

        Task<(Topic Topic, string ErrorMessage)> ITopicDL.UpdateTopic(Topic topic)
        {
            throw new NotImplementedException();
        }
    }
}
