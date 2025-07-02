using AutoMapper;
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
    public class DaysForCourseDL : IDaysForCourseDL
    {
        private readonly PsagotDbContext _context;

        public DaysForCourseDL(PsagotDbContext context)
        {
            _context = context;
        }

        public async Task<(DaysForCourse DaysForCourse, string ErrorMessage)> AddDaysForCourse(DaysForCourse daysForCourse)
        {
            try
            {
                var addedEntry = await _context.Set<DaysForCourse>().AddAsync(daysForCourse);
                await _context.SaveChangesAsync();

                var resultDaysForCourse = await _context.Set<DaysForCourse>()
                    .Include(dfc => dfc.Day)
                    .FirstOrDefaultAsync(dfc => dfc.DaysForCourseId == addedEntry.Entity.DaysForCourseId);

                return (resultDaysForCourse, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(IEnumerable<DaysForCourse> DaysForCourse, string ErrorMessage)> GetAllDaysForCourse()
        {
            try
            {
                var daysForCourse = await _context.Set<DaysForCourse>()
                    .Include(dfc => dfc.Course)
                    .Include(dfc => dfc.Day)
                    .ToListAsync();
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

        public async Task<(IEnumerable<DaysForCourse> DaysForCourse, string ErrorMessage)> GetDaysForCourseByCourseId(int courseId)
        {
            try
            {
                IEnumerable<DaysForCourse> DaysForCourse = await _context.Set<DaysForCourse>().Include(d => d.Day).Where(d => d.CourseId == courseId).ToListAsync();
                return (DaysForCourse, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(DaysForCourse DaysForCourse, string ErrorMessage)> UpdateDaysForCourse(DaysForCourse daysForCourse)
        {
            try
            {
                _context.Set<DaysForCourse>().Update(daysForCourse);
                await _context.SaveChangesAsync();

                var resultDaysForCourse = await _context.Set<DaysForCourse>()
                    .Include(dfc => dfc.Day)
                    .FirstOrDefaultAsync(dfc => dfc.DaysForCourseId == daysForCourse.DaysForCourseId);

                return (resultDaysForCourse, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(bool IsDeleted, string ErrorMessage)> DeleteDaysForCourse(int daysForCourseId)
        {
            try
            {
                var dayToDelete = await _context.Set<DaysForCourse>().FindAsync(daysForCourseId);
                if (dayToDelete == null)
                {
                    return (false, "days for course not found");
                }

                _context.Set<DaysForCourse>().Remove(dayToDelete);
                await _context.SaveChangesAsync();
                return (true, null);
            }
            catch (Exception ex)
            {
                return (false, ex.Message);
            }
        }

    }
}
