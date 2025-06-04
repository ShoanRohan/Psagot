using Entities.Contexts;
using Entities.DTO;
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
        private readonly PsagotDbContext _context;

        public CourseDL(PsagotDbContext context)
        {
            _context = context;
        }
        public async Task<(Course Course, string ErrorMessage)> GetCourseById(int id)
        {
            try
            {
                var course = await _context.Set<Course>().FindAsync(id);
                await _context.SaveChangesAsync();
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
                var courses = await _context.Set<Course>().ToListAsync();
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
        public async Task<(IEnumerable<Course> Courses, string ErrorMessage)> GetCoursesByFilter(CourseFilterDTO filter)
        {
            try
            {
                var query = _context.Set<Course>().AsQueryable();

                if (!string.IsNullOrWhiteSpace(filter.Name))
                    query = query.Where(c => c.Name.Contains(filter.Name));

                if (filter.Year.HasValue)
                    query = query.Where(c => c.Year == filter.Year);

                if (filter.StartDate.HasValue)
                    query = query.Where(c => c.StartDate >= DateOnly.FromDateTime(filter.StartDate.Value));

                if (filter.EndDate.HasValue)
                    query = query.Where(c => c.EndDate.HasValue && c.EndDate <= DateOnly.FromDateTime(filter.EndDate.Value));

                if (filter.CoordinatorId.HasValue)
                    query = query.Where(c => c.CoordinatorId == filter.CoordinatorId);

                if (filter.StatusId.HasValue)
                    query = query.Where(c => c.StatusId == filter.StatusId);

                var result = await query.ToListAsync();
                return (result, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
        public async Task<List<int>> GetExistingCourseYears()
        {
            return await _context.Set<Course>()
              .Select(c => c.Year)
              .Distinct()
              .OrderByDescending(y => y)
              .ToListAsync();

        }

        public async Task<List<StatusCourse>> GetAllStatusCourses()
        {
            return await _context.StatusCourses.ToListAsync();
        }


    }

}
