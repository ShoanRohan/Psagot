﻿using System;
using System.Collections.Generic;

namespace Entities.Models;
public partial class Course
{
    public int CourseId { get; set; }

    public string Name { get; set; } = null!;

    public int Year { get; set; }

    public string Color { get; set; } = null!;

    public DateOnly StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public int? NumberOfMeetings { get; set; }

    public int NumberOfStudents { get; set; }

    public string? Notes { get; set; }

    public int? CoordinatorId { get; set; }

    public int? StatusId { get; set; }

    public virtual User? Coordinator { get; set; }

    public virtual ICollection<DaysForCourse> DaysForCourses { get; set; } = new List<DaysForCourse>();

    public virtual ICollection<Meeting> Meetings { get; set; } = new List<Meeting>();

    public virtual StatusCourse? Status { get; set; }

    public virtual ICollection<Topic> Topics { get; set; } = new List<Topic>();
}
