using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public interface ICourseDL
    {
        Task<(Course Course, string ErrorMessage)> GetCourseById(int id);
    }
}
