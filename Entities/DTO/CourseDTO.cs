using System;
using System.Collections.Generic;

namespace Entities.DTO
{
    public class CourseDTO
    {
        public int CourseId { get; set; }

        public string Name { get; set; } = null!;

        public int Year { get; set; }

        public string Color { get; set; } = null!;

        public DateOnly StartDate { get; set; }

        public DateOnly? EndDate { get; set; }

        public int? NumberOfMeetings { get; set; }

        public int NumberOfStudents { get; set; }

        public string? Notes { get; set; }

    }
}
