using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class EventDTO
    {
        public int EventId { get; set; }
        public string Title { get; set; } = null!;
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
//להחזיר במבנה הזה
// title: "קורס תכנות - JAVA", start: "2025-03-02T12:00:00", end: "2025-03-02T14:00:00", extendedProps: { location: "חדר מחשבים", color: "#ffccf3"} }
