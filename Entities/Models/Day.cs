using System;
using System.Collections.Generic;

namespace Entities.Models;
public partial class Day
{
    public int DayId { get; set; }

    public string Name { get; set; } = null!;

    public string? Descr { get; set; }

    public virtual ICollection<DaysForCourse> DaysForCourses { get; set; } = new List<DaysForCourse>();

    public virtual ICollection<Meeting> Meetings { get; set; } = new List<Meeting>();

    public virtual ICollection<ScheduleForTopic> ScheduleForTopics { get; set; } = new List<ScheduleForTopic>();
}
