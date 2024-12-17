using AutoMapper;
using DL;
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
        

        public TopicBL(ITopicDL topicDL)
        {
            _topicDL = topicDL;

        }
    }
}
