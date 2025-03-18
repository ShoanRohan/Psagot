using System;
using System.Collections.Generic;

namespace Entities.Models;

public partial class Topic
{
    public int TopicId { get; set; }

    public int CourseId { get; set; }

    public string Name { get; set; } = null!;

    public int TeacherId { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public int? NumberOfMeetings { get; set; }

    public bool Computers { get; set; }

    public bool Projector { get; set; }

    public bool Microphone { get; set; }

    public int? StatusId { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual ICollection<Meeting> Meetings { get; set; } = new List<Meeting>();

    public virtual ICollection<ScheduleForTopic> ScheduleForTopics { get; set; } = new List<ScheduleForTopic>();

    public virtual StatusTopic? Status { get; set; }

    public virtual User Teacher { get; set; } = null!;
}
