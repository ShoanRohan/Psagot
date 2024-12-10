using System;
using System.Collections.Generic;

namespace Entities.Models;

public partial class Lecture
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
}
