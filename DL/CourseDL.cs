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

        public async Task<(Course Course, string ErrorMessage, bool hasFutureMeetings)> UpdateCourse(Course course)
        {
            try
            {
                var originalStatusId = await _context.Set<Course>()
                    .Where(c => c.CourseId == course.CourseId)
                    .Select(c => c.StatusId)
                    .FirstOrDefaultAsync();

                bool isStatusChangeFromActive = (originalStatusId == 1 && course.StatusId != 1);
                bool hasFutureMeetings = false;
                if (isStatusChangeFromActive)
                {
                    var futureMeetings = await _context.Set<Meeting>()
                        .Where(m => m.CourseId == course.CourseId && m.MeetingDate > DateOnly.FromDateTime(DateTime.Now))
                        .AsNoTracking()
                        .ToListAsync();

                    if (futureMeetings.Any())
                    {
                        hasFutureMeetings = true;
                        return (course, "לקורס קיימים מפגשים עתידיים. יש לאשר מחיקה.", hasFutureMeetings);
                    }
                }

                _context.Entry(course).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                if (isStatusChangeFromActive)
                {
                    var activeTopics = await _context.Set<Topic>()
                                 .Where(t => t.CourseId == course.CourseId && t.StatusId == 1)
                                 .ToListAsync();
                    if (activeTopics.Any())
                    {
                        var newStatusIdForTopics = course.StatusId;

                        foreach (var topic in activeTopics)
                        {
                            topic.StatusId = newStatusIdForTopics;
                            _context.Entry(topic).State = EntityState.Modified;
                        }
                        await _context.SaveChangesAsync();
                    }
                }
                return (course, null, false);
            }
            catch (Exception ex)
            {
                return (null, $"שגיאה בעדכון קורס: {ex.Message}", false);
            }
        }

        public async Task<string> DeleteFutureMeetingsForCourse(int courseId)
        {
            try
            {
                var futureMeetings = await _context.Set<Meeting>()
                    .Where(m => m.CourseId == courseId && m.MeetingDate > DateOnly.FromDateTime(DateTime.Now))
                    .ToListAsync();

                if (futureMeetings.Any())
                {
                    _context.Set<Meeting>().RemoveRange(futureMeetings);
                    await _context.SaveChangesAsync();
                }
                return null;
            }
            catch (Exception ex)
            {
                return $"שגיאה במחיקת מפגשים עתידיים: {ex.Message}";
            }
        }

        public async Task<(IEnumerable<Course> Courses, int TotalCount, string ErrorMessage)> GetPaginatedFilteredCourses(
            int skip, int pageSize,
            int? courseId, string courseName, string coordinatorName, int? year)
        {
            try
            {
                var query = _context.Courses
                    .Include(c => c.Status)
                    .Include(c => c.Coordinator)
                    .AsQueryable();

                if (courseId.HasValue)
                { query = query.Where(c => c.CourseId == courseId.Value); }

                if (!string.IsNullOrEmpty(courseName))
                { query = query.Where(c => c.Name.Contains(courseName)); }

                if (!string.IsNullOrEmpty(coordinatorName))
                { query = query.Where(c => c.Coordinator.Name.Contains(coordinatorName)); }

                if (year.HasValue)
                { query = query.Where(c => c.Year == year.Value); }

                var totalCount = query.Count();
                var courses = await query.Skip(skip).Take(pageSize).ToListAsync();

                return (courses, totalCount, null);

            }
            catch (Exception ex)
            {
                return (null, 0, ex.Message);
            }
        }

        public async Task<(IEnumerable<Course> Courses, string ErrorMessage)> GetFilteredCourses(
            int? courseId, string courseName, string coordinatorName, int? year)
        {
            try
            {
                var query = _context.Courses
                    .Include(c => c.Status)
                    .Include(c => c.Coordinator)
                    .AsQueryable();

                if (courseId.HasValue)
                    query = query.Where(c => c.CourseId == courseId.Value);

                if (!string.IsNullOrEmpty(courseName))
                    query = query.Where(c => c.Name.Contains(courseName));

                if (!string.IsNullOrEmpty(coordinatorName))
                    query = query.Where(c => c.Coordinator.Name.Contains(coordinatorName));

                if (year.HasValue)
                    query = query.Where(c => c.Year == year.Value);

                var courses = await query.ToListAsync();
                return (courses, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}
