using Entities.DTO;
using Entities.Models;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface IScheduleForTopicBL
    {
        Task<(IEnumerable<ScheduleForTopicDTO> Schedules, string ErrorMessage)> GetScheduleForTopicById(int id);
        Task<(ScheduleForTopicDTO ScheduleForTopic, string ErrorMessage)> UpdateScheduleForTopic(ScheduleForTopicDTO scheduleForTopicDTO);

        Task<(IEnumerable<ScheduleForTopicDTO> ScheduleForTopics, string ErrorMessage)> GetAllScheduleForTopics();
        Task<(IEnumerable<ScheduleForTopicDTO> ScheduleForTopic, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int TopicId);
    }
}
