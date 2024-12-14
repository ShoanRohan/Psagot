using Entities.DTO;

namespace BL
{
    public interface IScheduleForTopicBL
    {
        Task<(IEnumerable<ScheduleForTopicDTO> scheduleForTopic, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int id);

    }
}