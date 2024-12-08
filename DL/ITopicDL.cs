using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public interface ITopicDL
    {
        Task<(Topic Topic, string ErrorMessage)> AddTopic(Topic topic);
        Task<(IEnumerable<Topic> Topics, string ErrorMessage)> GetAllTopic();
        Task<(Topic Topic, string ErrorMessage)> GetTopicById(int id);
        Task<(Topic Topic, string ErrorMessage)> UpdateTopic(Topic topic);
    }
}
