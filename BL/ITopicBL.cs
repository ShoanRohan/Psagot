using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
   public interface ITopicBL
    {
        Task<(TopicDTO Topic, string ErrorMessage)> AddTopic(TopicDTO topicDTO);
        Task<(List<TopicDTO> Topics, string ErrorMessage)> GetAllTopicsForCourseByCourseId(int id);
        Task<(IEnumerable<TopicDTO> Topics, string ErrorMessage)> GetAllTopics();
    }
}
