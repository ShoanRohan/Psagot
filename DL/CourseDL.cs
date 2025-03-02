
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
    public class CourseDL:ICourseDL
    {
        private readonly PsagotContext _context;
        public CourseDL(PsagotContext context)
        {
            _context = context;
        }

        public async Task<(Course Course, string ErrorMessage)> AddCourse(Course course)
        {
            var addedCourse = await _context.Set<Course>().AddAsync(course);
            await _context.SaveChangesAsync();
            return (addedCourse.Entity, null);
        }

        //public async Task<(Course Course, string ErrorMessage)> AddCourse(Course course)
        //{
        //  //var u=  await _context.Set<Course>().Include(y => y.DaysForCourses).ToListAsync();

        //    //return (u,null);
        //}

        public async Task<(Course Course, string ErrorMessage)> GetCourseById(int id)
        {
            try
            {
                var course = await _context.Set<Course>().FindAsync(id);
                return (course, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(IEnumerable<ScheduleForTopic> ScheduleForTopics, string ErrorMessage)> GetInclude()
        {
            try
            {
                var includes = await _context.Set<ScheduleForTopic>().Include(ac=>ac.Day)
                    .Include(ac=>ac.Topic).Include(ac=>ac.Meetings).ToListAsync();
                return (includes, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}
