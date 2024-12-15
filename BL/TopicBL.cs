using AutoMapper;
using DL;
using Entities.DTO;
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
        public TopicBL(ITopicDL topicDL)
        {
            _topicDL = topicDL;
        }
        public async Task<(List<TopicDTO> topics, string ErrorMessage)> GetAllTopicsForCourseByCourseId(int id)
        {
            var (topics, errorMessage) = await _topicDL.GetAllTopicsForCourseByCourseId(id);
            if (topics == null || !topics.Any()) return (null, errorMessage ?? "No topics found for the given course ID");

            return (topics.Select(t => _mapper.Map<TopicDTO>(t)).ToList(), null);
        }
    }
}
