using Entities.DTO;
using Entities.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL
{
    public interface IScheduleForTopicBL
    {
        Task<(IEnumerable<ScheduleForTopicDTO> Schedules, string ErrorMessage)> GetScheduleForTopicByTopicId(int topicId);
    }
}
