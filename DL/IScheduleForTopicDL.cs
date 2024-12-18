using Entities.Models;

namespace DL
{
    public interface IScheduleForTopicDL
    {
        Task<(ScheduleForTopic scheduleForTopic, string ErrorMessage)> UpdateScheduleForTopic(ScheduleForTopic scheduleForTopic);
    }
}