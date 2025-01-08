using Entities.Models;

namespace DL
{
    public interface IScheduleForTopicDL
    {
        Task<(IEnumerable<ScheduleForTopic> scheduleForTopics, string ErrorMessage)> GetAllScheduleForTopics();
        Task<(IEnumerable<ScheduleForTopic> ScheduleForTopics, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int topicId);

    }
}