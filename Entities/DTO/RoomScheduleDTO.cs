using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class RoomScheduleByDateDTO
    {
        public string CourseName { get; set; }
        public string TopicName { get; set; }
        public string CourseColor { get; set; }
        public string Lecturer { get; set; }
        public TimeOnly  StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public string RoomName { get; set; }

    }
}
