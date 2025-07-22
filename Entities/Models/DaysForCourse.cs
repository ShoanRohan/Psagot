using System;
using System.Collections.Generic;

namespace Entities.Models;
public partial class DaysForCourse
{
    public int DaysForCourseId { get; set; }

    public int DayId { get; set; }

    public int CourseId { get; set; }

    public TimeOnly StartTime { get; set; }

    public TimeOnly EndTime { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual Day Day { get; set; } = null!;
}
