using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Models;

namespace Entities.DTO
{
    public class ScheduleForTopicDTO
    {
        public int ScheduleForTopicId { get; set; }

        public int TopicName { get; set; } //לקחת את השם

        public int DayName { get; set; } //לקחת את השם

        public TimeOnly StartTime { get; set; }

        public TimeOnly EndTime { get; set; }

        //public virtual Day Day { get; set; } = null!;

        public ICollection<Meeting> Meetings { get; set; } = new List<Meeting>();

        //public virtual Topic Topic { get; set; } = null!;
    }
}
