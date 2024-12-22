using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Models;

namespace DL
{ 
    public interface IScheduleForTopicDL
    {
        Task<(ScheduleForTopic ScheduleForTopic, string ErrorMessage)> UpdateScheduleForTopic(ScheduleForTopic scheduleForTopic);

        Task<(IEnumerable<ScheduleForTopic> ScheduleForTopics, string ErrorMessage)> GetAllScheduleForTopics();
    }
}
