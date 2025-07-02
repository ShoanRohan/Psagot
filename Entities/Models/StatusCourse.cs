using System;
using System.Collections.Generic;

namespace Entities.Models;

public partial class StatusCourse
{
    public int StatusCourseId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
}
