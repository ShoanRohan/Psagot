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
        public async Task<(List<TopicDTO> Topics, string ErrorMessage)> GetAllTopicsForCourseByCourseId(int id)
        {
            var (topics, errorMessage) = await _topicDL.GetAllTopicsForCourseByCourseId(id);
            if (topics == null || !topics.Any()) return (null, errorMessage);
            return (topics.Select(t => _mapper.Map<TopicDTO>(t)).ToList(), null);
        }
        public async Task<(TopicDTO Topic, string ErrorMessage)> AddTopic(TopicDTO topicDTO)
        {
            var topic = _mapper.Map<Topic>(topicDTO);
            var (addTopic, errorMessage) = await _topicDL.AddTopic(topic);

            if (addTopic == null) return (null, errorMessage);

            return (_mapper.Map<TopicDTO>(addTopic), null);
        }
        
    }
}
