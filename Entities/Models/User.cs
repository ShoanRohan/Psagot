using System;
using System.Collections.Generic;

namespace Entities.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int UserTypesId { get; set; }

    public bool IsActive { get; set; }

    public virtual ICollection<Course> Courses { get; set; } = new List<Course>();

    public virtual ICollection<Meeting> Meetings { get; set; } = new List<Meeting>();

    public virtual ICollection<Topic> Topics { get; set; } = new List<Topic>();

    public virtual UserType UserType { get; set; } = null!;
}
