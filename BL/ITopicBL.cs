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
        Task<(List<TopicDTO> topics, string ErrorMessage)> GetAllTopicsForCourseByCourseId(int id);
        Task<(TopicDTO Topic, string ErrorMessage)> UpdateTopic(TopicDTO topicDTO);
        Task<(bool IsDeleted, string ErrorMessage)> DeleteTopic(int topicId);


    }
}
