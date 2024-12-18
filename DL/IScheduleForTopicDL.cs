using Entities.Models;

namespace DL
{
    public interface IScheduleForTopicDL
    {
        Task<(ScheduleForTopic ScheduleForTopic, string ErrorMessage)> GetScheduleForTopicById(int id);
    }
}