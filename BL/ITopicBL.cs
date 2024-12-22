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
        Task<(List<TopicDTO> topics, string ErrorMessage)> GetAllTopicsForCourseByCourseId(int id);


    }
}
