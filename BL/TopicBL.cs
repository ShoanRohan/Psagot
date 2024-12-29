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
    public class TopicBL : ITopicBL
    {
        private readonly ITopicDL _topicDL;
        private readonly IMapper _mapper;

        public TopicBL(ITopicDL topicDL, IMapper mapper)
        {
            _topicDL = topicDL;
            _mapper = mapper;
        }

        public async Task<(IEnumerable<TopicDTO> Topics, string ErrorMessage)> GetAllTopicsByCourseId(int courseId)
        {
            var (topics, errorMessage) = await _topicDL.GetAllTopicsByCourseId(courseId);

            if (topics == null || !topics.Any())
                return (null, errorMessage);

            return (_mapper.Map<IEnumerable<TopicDTO>>(topics), null);
        }
       

    }
}
