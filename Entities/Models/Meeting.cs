using System;
using System.Collections.Generic;

namespace Entities.Models;

public partial class Meeting
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

    public virtual Course? Course { get; set; }

    public virtual Day? Day { get; set; }

    public virtual Room Room { get; set; } = null!;

    public virtual ScheduleForTopic? ScheduleForTopic { get; set; }

    public virtual User? Teacher { get; set; }

    public virtual Topic? Topic { get; set; }
}
