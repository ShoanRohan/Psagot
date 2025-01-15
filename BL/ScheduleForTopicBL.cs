using AutoMapper;
using DL;
using Entities.Models;
using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BL
{
    public class ScheduleForTopicBL : IScheduleForTopicBL
    {
        private readonly IScheduleForTopicDL _scheduleForTopicDL;
        private readonly IMapper _mapper;

        public ScheduleForTopicBL(IScheduleForTopicDL scheduleForTopicDL, IMapper mapper)
        {
            _scheduleForTopicDL = scheduleForTopicDL;
            _mapper = mapper;
        }


        public async Task<(bool IsDeleted, string ErrorMessage)> DeleteScheduleForTopic(int TopicId)
        {
            var (isDeleted, errorMessage) = await _scheduleForTopicDL.DeleteScheduleForTopic(TopicId);
            
            if (!isDeleted) 
            {
                return (false, errorMessage);
            }
            
            return (true, null);
        }
    }
}