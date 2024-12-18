using Entities.DTO;

namespace BL
{
    public interface IScheduleForTopicBL
    {
        Task<(ScheduleForTopicDTO ScheduleForTopic, string ErrorMessage)> GetScheduleForTopicById(int id);
    }
}