using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class ScheduleForTopicDTO
    {
        public int ScheduleForTopicId { get; set; }

        public int TopicId { get; set; }

        public int DayId { get; set; }

        public TimeOnly StartTime { get; set; }

        public TimeOnly EndTime { get; set; }
    }
}
