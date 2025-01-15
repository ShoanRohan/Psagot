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
    public class DaysForCourseDL: IDaysForCourseDL
    {
        private readonly PsagotDbContext _context;
        IMapper _mapper;

        public DaysForCourseDL(PsagotDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<(DaysForCourse DaysForCourse, string ErrorMessage)> AddDaysForCourse(DaysForCourse daysForCourse)
        {
            try
            {
                var addedDaysForCourse = await _context.Set<DaysForCourse>().AddAsync(daysForCourse);
                await _context.SaveChangesAsync();
                return (addedDaysForCourse.Entity, null);
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
