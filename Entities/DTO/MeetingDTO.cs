using Entities.Models;
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

        public int? CourseId { get; set; }

        public int? TopicId { get; set; }

        public int? TeacherId { get; set; }

        public DateOnly MeetingDate { get; set; }

        public virtual CourseDTO? Course { get; set; }

        public virtual DayDTO? Day { get; set; }

        public virtual RoomDTO Room { get; set; } = null!;

        public virtual ScheduleForTopicDTO? ScheduleForTopic { get; set; }

        public virtual UserDTO? Teacher { get; set; }

        public virtual TopicDTO? Topic { get; set; }
    }
}
