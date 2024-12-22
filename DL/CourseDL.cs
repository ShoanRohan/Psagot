using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Contexts;
using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace DL
{
    public class CourseDL : ICourseDL
    {
        public PsagotDbContext _context;

        public CourseDL(PsagotDbContext context)
        {
            _context = context;
        }

        public async Task<bool> DeleteCourse(int id)
        {
            try
            {
                Course currentCourse = await _context.Courses.SingleOrDefaultAsync(item => item.CourseId == id);
                if (currentCourse != null)
                {
                    throw new ArgumentException($"{id} is not found");
                }
                _context.Courses.Remove(currentCourse);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex) { throw ex; }
        }

    }
}
