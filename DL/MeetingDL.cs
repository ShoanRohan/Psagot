using AutoMapper.Internal;
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
    public class MeetingDL : IMeetingDL
    {
        private readonly PsagotDbContext _context;

        public MeetingDL(PsagotDbContext context)
        {
            _context = context;
        }

        public async Task<(Meeting Meeting, string ErrorMessage)> UpdateMeeting(Meeting meeting)
        {
            try
            {
                _context.Set<Meeting>().Update(meeting);
                await _context.SaveChangesAsync();
                return (meeting, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(Meeting Meeting, string ErrorMessage)> GetMeetingById(int meetingId)
        {
            try
            {
                var meeting = await _context.Set<Meeting>().FindAsync(meetingId);
                return (meeting, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(IEnumerable<Meeting> Meeting, string ErrorMessage)> GetAllMeetings()
        {
            try
            {
                var meetings = await _context.Set<Meeting>().ToListAsync();
                return (meetings, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(Meeting Meeting, string ErrorMessage)> AddMeeting(Meeting meeting)
        {
            try
            {
                var addedMeeting = await _context.Set<Meeting>().AddAsync(meeting);
                await _context.SaveChangesAsync();
                return (addedMeeting.Entity, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
        public async Task<(ListOfMeetingsForTopic Result, string ErrorMessage)> SearchMeetings(int? courseId, int? topicId, string teacherName, DateOnly? date, int pageNumber = 1, int pageSize = 20)
        {
            try
            {
                var query = _context.Meetings.AsQueryable();

                // אם כל הפרמטרים ריקים, סנן רק לפי תאריך (ברירת מחדל היום)
                if (!courseId.HasValue && !topicId.HasValue && string.IsNullOrEmpty(teacherName))
                {
                    query = query.Where(m => m.MeetingDate == (date.HasValue ? date.Value : DateOnly.FromDateTime(DateTime.Today)));
                }
                else
                {
                    // אחרת, סנן לפי כל הפרמטרים שסופקו
                    if (date.HasValue)
                    {
                        query = query.Where(m => m.MeetingDate == date.Value);
                    }
                    else
                    {
                        query = query.Where(m => m.MeetingDate == DateOnly.FromDateTime(DateTime.Today));
                    }

                    if (courseId.HasValue)
                    {
                        query = query.Where(m => m.CourseId == courseId.Value);
                    }

                    if (topicId.HasValue)
                    {
                        query = query.Where(m => m.TopicId == topicId.Value);
                    }

                    if (!string.IsNullOrEmpty(teacherName))
                    {
                        // חיפוש מרצה לפי שם וסוג משתמש
                        var teacher = await _context.Users
                            .FirstOrDefaultAsync(u => u.Name == teacherName && u.UserTypeId == 2); // 2 הוא ID של מרצה

                        if (teacher != null)
                        {
                            query = query.Where(m => m.TeacherId == teacher.UserId);
                        }
                        // אם מרצה לא נמצא, המשך בלי סינון לפי מרצה
                    }
                }

                int totalCount = await query.CountAsync();

                var meetings = await query
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return (new ListOfMeetingsForTopic
                {
                    Meetings = meetings,
                    TotalCount = totalCount,
                    PageNumber = pageNumber,
                    PageSize = pageSize
                }, null); // החזר תוצאות עם null ללא שגיאה
            }
            catch (Exception ex)
            {
                return (null, ex.Message); // החזר null עבור תוצאות ושגיאה
            }
        }
    }
}