
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class CheckTopicsConflictRequestDTO
    {
        public int CourseId { get; set; }
        public List<DaysForCourseRequestDTO> NewDays { get; set; }

    }

}
