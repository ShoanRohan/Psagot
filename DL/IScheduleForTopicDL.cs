using Entities.Models;

namespace DL
{
    public interface IScheduleForTopicDL
    {
        Task<(IEnumerable<ScheduleForTopic> ScheduleForTopics, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int topicId);

    }
}