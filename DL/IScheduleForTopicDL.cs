using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DL
{ 
    public interface IScheduleForTopicDL
    {
        Task<(ScheduleForTopic ScheduleForTopic, string ErrorMessage)> GetScheduleForTopicById(int id);
        
        Task<(bool IsDeleted, string ErrorMessage)> DeleteScheduleForTopic( int TopicId);

        Task<(ScheduleForTopic ScheduleForTopic, string ErrorMessage)> UpdateScheduleForTopic(ScheduleForTopic scheduleForTopic);

        Task<(IEnumerable<ScheduleForTopic> ScheduleForTopics, string ErrorMessage)> GetAllScheduleForTopics();

        Task<(IEnumerable<ScheduleForTopic> ScheduleForTopic, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int topicId);
    }
}
