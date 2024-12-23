﻿using Entities.DTO;
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
        Task<(TopicDTO Topic, string ErrorMessage)> AddTopic(TopicDTO topicDTO);
        Task<(List<TopicDTO> Topics, string ErrorMessage)> GetAllTopicsForCourseByCourseId(int id);
        Task<(IEnumerable<TopicDTO> Topics, string ErrorMessage)> GetAllTopics();


    }
}
