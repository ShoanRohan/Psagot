using System;
using System.Collections.Generic;

namespace Entities.Models;

public partial class Topic
{
    public int TopicId { get; set; }

    public int CourseId { get; set; }

    public string Name { get; set; } = null!;

    public int TeacherId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public int? NumberOfMeetings { get; set; }

    public bool Computers { get; set; }

    public bool Projector { get; set; }

    public bool Microphone { get; set; }

    public virtual Course Course { get; set; } = null!;

    public virtual ICollection<ScheduleForTopic> ScheduleForTopics { get; set; } = new List<ScheduleForTopic>();

    public virtual User Teacher { get; set; } = null!;
}
