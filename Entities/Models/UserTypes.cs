using System;
using System.Collections.Generic;

namespace Entities.Models;

public partial class UserTypes
{
    public int UserTypeId { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}