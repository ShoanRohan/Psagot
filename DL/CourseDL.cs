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
    public class CourseDL : ICourseDL
    {
        private readonly PsagotDbContext _context;

        public CourseDL(PsagotDbContext context)
        {
            _context = context;
        }

        public async Task<(Course Course, string ErrorMessage)> GetCourseById(int id)
        {
            try
            {
                var course = await _context.Set<Course>().Include(c => c.Coordinator).Include(c => c.Status).SingleOrDefaultAsync(c => c.CourseId == id);
                return (course, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(IEnumerable<Course> Courses, string ErrorMessage)> GetAllCourses()
        {
            try
            {
                var courses = await _context.Set<Course>().Include(c => c.Status).Include(c => c.Coordinator).ToListAsync();
                return (courses, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(Course Course, string ErrorMessage)> AddCourse(Course course)
        {
            try
            {
                var addedCourse = await _context.Set<Course>().AddAsync(course);
                await _context.SaveChangesAsync();
                return (addedCourse.Entity, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(Course Course, string ErrorMessage)> UpdateCourse(Course course)
        {
            try
            {
                _context.Set<Course>().Update(course);
                await _context.SaveChangesAsync();
                return (course, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(IEnumerable<Course> Courses, int TotalCount, string ErrorMessage)> GetPaginatedFilteredCourses(
            int skip, int pageSize,
           int? courseId,
           string courseName,
           string coordinatorName,
           int? year)
        {
            try
            {
                var query = _context.Courses
                    .Include(c => c.Status)
                    .Include(c => c.Coordinator)
                    .AsQueryable();

                if (courseId.HasValue)
                {
                    query = query.Where(c => c.CourseId == courseId.Value);
                }

                if (!string.IsNullOrEmpty(courseName))
                {
                    query = query.Where(c => c.Name.Contains(courseName));
                }

                if (!string.IsNullOrEmpty(coordinatorName))
                {
                    query = query.Where(c => c.Coordinator.Name.Contains(coordinatorName));
                }

                if (year.HasValue)
                {
                    query = query.Where(c => c.Year == year.Value);
                }

                var totalCount = query.Count();
                var courses = await query.Skip(skip).Take(pageSize).ToListAsync();

                return (courses, totalCount, null);

            }
            catch (Exception ex)
            {
                return (null, 0, ex.Message);
            }



        }

      
    }
}
