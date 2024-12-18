using Entities.DTO;

namespace BL
{
    public interface IScheduleForTopicBL
    {
        Task<(IEnumerable<ScheduleForTopicDTO> scheduleForTopics, string ErrorMessage)> GetAllScheduleForTopics();
    }
}