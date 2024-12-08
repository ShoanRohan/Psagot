using System;
using System.Collections.Generic;

namespace Entities.Models;

public partial class Room
{
    public int RoomId { get; set; }

    public string Name { get; set; } = null!;

    public bool Projector { get; set; }

    public bool Computers { get; set; }

    public bool Speakers { get; set; }

    public int Capacity { get; set; }

    public virtual ICollection<Meeting> Meetings { get; set; } = new List<Meeting>();
}
