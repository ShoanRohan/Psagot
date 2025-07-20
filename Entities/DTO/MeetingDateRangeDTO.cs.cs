using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
  

        public class MeetingDateRangeDTO
        {
            public DateOnly From { get; set; }
            public DateOnly To { get; set; }
            public string? ViewType { get; set; }
        }
    }
