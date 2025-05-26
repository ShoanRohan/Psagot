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
    public class StatusCourseDL : IStatusCourseDL
    {
        private readonly PsagotDbContext _context;

        public StatusCourseDL(PsagotDbContext context)
        {
            _context = context;
        }

        public async Task<(IEnumerable<StatusCourse> Statuses, string ErrorMessage)> GetAllStatuses()
        {
            try
            {
                var statuses = await _context.StatusCourses.ToListAsync();
                return (statuses, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }

}
