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

        public async Task<(IEnumerable<DaysForCourse> DaysForCourse, string ErrorMessage)> GetAllDaysForCourse()
        {
            try
            {
                var daysForCourse = await _context.Set<DaysForCourse>().ToListAsync();
                return (daysForCourse, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}
