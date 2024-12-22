using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class TopicBL:ITopicBL
    {
        private readonly ITopicDL _topicDL;
        private readonly IMapper _mapper;
        public TopicBL(ITopicDL topicDL, IMapper mapper)
        {
            _topicDL = topicDL;
            _mapper = mapper;
        }
        public async Task<(List<TopicDTO> topics, string ErrorMessage)> GetAllTopicsForCourseByCourseId(int id)
        {
            var (topics, errorMessage) = await _topicDL.GetAllTopicsForCourseByCourseId(id);
            if (topics == null || !topics.Any()) return (null, errorMessage);

            return (topics.Select(t => _mapper.Map<TopicDTO>(t)).ToList(), null);
        }
        public async Task<(TopicDTO Topic, string ErrorMessage)> UpdateTopic(TopicDTO topicDTO)
        {
            var topic = _mapper.Map<Topic>(topicDTO);
            var (updatedTopic, errorMessage) = await _topicDL.UpdateTopic(topic);

            if (updatedTopic == null) return (null, errorMessage);

            return (_mapper.Map<TopicDTO>(updatedTopic), null);
        }
        public async Task<(bool IsDeleted, string ErrorMessage)> DeleteTopic(int topicId)
        {
            var (isDeleted, errorMessage) = await _topicDL.DeleteTopic(topicId);

            if (!isDeleted)
            {
                return (false, errorMessage);
            }

            return (true, null);
        }

    }
}
