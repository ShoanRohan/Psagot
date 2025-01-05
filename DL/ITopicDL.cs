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
        Task<(Topic Topic, string ErrorMessage)> GetTopicById(int id);

        Task<(Topic Topic, string ErrorMessage)> AddTopic(Topic topic);


        Task<(List<Topic> Topics, string ErrorMessage)> GetAllTopicsForCourseByCourseId(int id);

        Task<(IEnumerable<Topic> Topics, string ErrorMessage)> GetAllTopics();
    }
}
