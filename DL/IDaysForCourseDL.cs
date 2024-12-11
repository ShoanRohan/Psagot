using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public interface IDaysForCourseDL
    {
        public Task<(IEnumerable<DaysForCourse> DaysForCourse, string ErrorMessage)> GetAllDaysForCourse();
    }
}
