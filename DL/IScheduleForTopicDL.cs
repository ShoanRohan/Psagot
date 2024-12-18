
using Entities.Models;

namespace DL
{
    public interface IScheduleForTopicDL
    {
        Task<(IEnumerable<ScheduleForTopic> scheduleForTopics, string ErrorMessage)> GetAllScheduleForTopic();
    }
}