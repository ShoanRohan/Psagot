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
        public string Name { get; set; }
        public int Year { get; set; }
        public string Color { get; set; }
        public Date StartDate { get; set; }
        public Date EndDate { get; set; }
        public int NumberOfMeetings { get; set; }
        public int NumberOfStudents { get; set; }
        public int Notes { get; set; }


    }
}
