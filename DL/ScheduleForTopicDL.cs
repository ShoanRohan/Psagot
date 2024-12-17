﻿using Entities.Contexts;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class ScheduleForTopicDL: IScheduleForTopicDL
    {
        private readonly PsagotDbContext _context;

        public ScheduleForTopicDL(PsagotDbContext context)
        {
            _context = context;
        }

        public async Task<(IEnumerable<ScheduleForTopic> ScheduleForTopic, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int topicId)
        {
            try
            {
                var ScheduleForTopic = await _context.Set<ScheduleForTopic>().Where(s => s.TopicId == topicId)
                .ToListAsync(); ;
                return (ScheduleForTopic, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}
