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
        // הפונקציה מקבלת ID של TOPIC ושולפת את כל המערכת עבורו
        Task<(ScheduleForTopic ScheduleForTopic, string ErrorMessage)> GetScheduleForTopicById(int id);


        Task<(ScheduleForTopic ScheduleForTopic, string ErrorMessage)> UpdateScheduleForTopic(ScheduleForTopic scheduleForTopic);

        Task<(IEnumerable<ScheduleForTopic> ScheduleForTopics, string ErrorMessage)> GetAllScheduleForTopics();

        Task<(IEnumerable<ScheduleForTopic> ScheduleForTopic, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int topicId);
    }
}
