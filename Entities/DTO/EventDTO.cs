using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class EventDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public ExtendedProps ExtendedProps { get; set; } = new ExtendedProps();
    }

    public class ExtendedProps
    {
        public string Location { get; set; } = null!;
        public string Color { get; set; } = null!;
    }
}
