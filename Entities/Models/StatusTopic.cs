using System;
using System.Collections.Generic;

namespace Entities.Models;

public partial class StatusTopic
{
    public int StatusTopicId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Topic> Topics { get; set; } = new List<Topic>();
}
