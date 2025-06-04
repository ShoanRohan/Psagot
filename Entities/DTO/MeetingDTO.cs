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
        public string? Reason { get; set; }
        public int Year { get; set; }
        public int StatusCourseId { get; set; }

    }
}
