using Entities.DTO;

namespace BL
{
    public interface IScheduleForTopicBL
    {
        Task<(IEnumerable<ScheduleForTopicDTO> scheduleForTopics, string ErrorMessage)> GetAllScheduleForTopics();
        Task<(IEnumerable<ScheduleForTopicDTO> ScheduleForTopics, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int topicId);

    }
}