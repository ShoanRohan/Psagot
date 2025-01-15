using Entities.DTO;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface IScheduleForTopicBL
    {
        Task<(bool IsDeleted , string ErrorMessage)> DeleteScheduleForTopic(int TopicId);
        Task<(ScheduleForTopicDTO Schedule, string ErrorMessage)> GetScheduleForTopicById(int id);
        Task<(ScheduleForTopicDTO ScheduleForTopic, string ErrorMessage)> UpdateScheduleForTopic(ScheduleForTopicDTO scheduleForTopicDTO);
                Task<(IEnumerable<ScheduleForTopicDTO> ScheduleForTopics, string ErrorMessage)> GetAllScheduleForTopics();
        Task<(IEnumerable<ScheduleForTopicDTO> ScheduleForTopic, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int TopicId);
    }
}
