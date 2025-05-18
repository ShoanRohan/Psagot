using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class ListOfMeetingsForTopicDTO
    {
        public List<MeetingDTO> Meetings { get; set; }
        public int TotalCount { get; set; }
    }
}
