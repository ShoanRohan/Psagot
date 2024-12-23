﻿using AutoMapper;
using DL;
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

        public async Task<(IEnumerable<Topic> Topics, string ErrorMessage)> GetTopicById(int courseId)
        {
            // קריאה ל-DL לקבלת כל הנושאים של הקורס
            var (topics, errorMessage) = await _topicDL.GetTopicById(courseId);

            // אם לא נמצאו נושאים או שיש שגיאה
            if (topics == null || !topics.Any())
            {
                return (null, errorMessage ?? "No topics found for the specified course ID.");
            }

            // אם הנושאים נמצאו בהצלחה, מחזירים את הרשימה יחד עם null להודעת שגיאה
            return (topics, null);
        }

    }
}
