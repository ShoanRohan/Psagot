using System;
using System.Collections.Generic;

namespace Entities.Models;

public partial class ScheduleForTopic
{
    public int ScheduleForTopicId { get; set; }

    public int TopicId { get; set; }

    public int DayId { get; set; }

    public TimeOnly StartTime { get; set; }

    public TimeOnly EndTime { get; set; }

    public virtual Day Day { get; set; } = null!;

    public virtual ICollection<Meeting> Meetings { get; set; } = new List<Meeting>();

    public virtual Topic Topic { get; set; } = null!;
}
