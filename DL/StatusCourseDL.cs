using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Contexts;
using Microsoft.EntityFrameworkCore;
using Entities.Models;
namespace DL
{
    public class StatusCourseDL : IStatusCourseDL
    {
        private readonly PsagotDbContext _context;

        public StatusCourseDL(PsagotDbContext context)
        {
            _context = context;
        }

        public async Task<(IEnumerable<StatusCourse> StatusCourses, string ErrorMessage)> GetAllStatusCourses()
        {
            try
            {
                var statusCourses = await _context.Set<StatusCourse>().ToListAsync();
                return (statusCourses, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}