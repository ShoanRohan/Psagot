using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class DayDTO
    {
        public int DayId { get; set; }
        public string Name { get; set; } = null!;

        public string? Descr { get; set; }
    }
}
