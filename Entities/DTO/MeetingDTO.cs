using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class MeetingDTO
    {
        public int MeetingId { get; set; }

        public int? ScheduleForTopicId { get; set; }

        public int MeetingNumberForTopic { get; set; }

        public int RoomId { get; set; }

        public bool IsValid { get; set; }

        public int? DayId { get; set; }

        public TimeOnly? StartTime { get; set; }

        public TimeOnly? EndTime { get; set; }

        public bool IsPartOfSchedule { get; set; }
    }
}
