using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class DaysForCourseRequestDTO
    {
        public int DaysForCourseId { get; set; }
        public int DayId { get; set; }
        public int CourseId { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public string? DayName { get; set; }
    }

}
