using Entities.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

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

        public int? CoordinatorId { get; set; }

        public int? StatusId { get; set; }

        public virtual UserDTO? Coordinator { get; set; }

        public virtual StatusCourse? Status { get; set; }

        public virtual string? CoordinatorName { get;}
    }

}
