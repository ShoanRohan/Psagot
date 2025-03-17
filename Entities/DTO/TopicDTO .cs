using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class TopicDTO
    {
        public int TopicId { get; set; }

        public int CourseId { get; set; }

        public string Name { get; set; } = null!;

        public int TeacherId { get; set; }

        public DateOnly StartDate { get; set; }

        public DateOnly? EndDate { get; set; }

        public int? NumberOfMeetings { get; set; }

        public bool Computers { get; set; }

        public bool Projector { get; set; }

        public bool Microphone { get; set; }
        public int? StatusId { get; set; }

        public virtual StatusTopic? Status { get; set; }
    }
}
