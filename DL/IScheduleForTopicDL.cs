using Entities.Models;

namespace DL
{
    public interface IScheduleForTopicDL
    {
        Task<(IEnumerable<ScheduleForTopic> scheduleForTopic, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int id);

    }
}