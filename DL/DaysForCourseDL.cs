using Entities.Contexts;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class DaysForCourseDL: IDaysForCourseDL
    {
        private readonly PsagotDbContext _context;
        public DaysForCourseDL(PsagotDbContext context)
        {
            _context = context;
        }
        public async Task<(IEnumerable<DaysForCourse> DaysForCourse, string ErrorMessage)> GetDaysForCourseByCourseId(int courseId)
        {
            try
            {
                IEnumerable<DaysForCourse> DaysForCourse = await _context.Set<DaysForCourse>().Where(d => d.CourseId == courseId).ToListAsync();
                return (DaysForCourse, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

    }
}
