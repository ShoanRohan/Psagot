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

        public async Task<bool> AddDaysForCourse(int courseId, int daysToAdd)
        {
            try
            {
                var course = await _context.Set<Course>().FindAsync(courseId);
                if (course == null)
                    return false;

                course.EndDate = course.EndDate?.AddDays(daysToAdd);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
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

        public async Task<(DaysForCourse DayForCourse, string ErrorMessage)> GetDaysForCourseById(int id)
        {
            try
            {
                var dayForCourse = await _context.Set<DaysForCourse>().FindAsync(id);
                return (dayForCourse, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}
