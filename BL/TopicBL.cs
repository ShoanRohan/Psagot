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
    public class TopicBL : ITopicBL
    {
        private readonly ITopicDL _topicDL;
        private readonly IMapper _mapper;

        public TopicBL(ITopicDL topicDL)
        {
            _topicDL = topicDL;

        }
        public async Task<(IEnumerable<TopicDTO> Topics, string ErrorMessage)> GetAllTopics()
        {
            var (topics, errorMessage) = await _topicDL.GetAllTopics();
            if (topics == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<TopicDTO>>(topics), null);
        }
    }
}
