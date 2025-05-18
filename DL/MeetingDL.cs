using AutoMapper;
using AutoMapper.Internal;
using Entities.Contexts;
using Entities.DTO;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Globalization;

namespace DL
{
    public class MeetingDL : IMeetingDL
    {
        private readonly PsagotDbContext _context;
        private readonly IMapper _mapper;

        public MeetingDL(PsagotDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
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
        public async Task<(List<Meeting> Meetings, int TotalCount, string ErrorMessage)> SearchMeetings(int? courseId, int? topicId, string teacherName, string? date, int pageNumber, int pageSize)
        {
            try
            {
                var query = _context.Meetings.AsQueryable();

                // קבע את התאריך לסינון. אם לא סופק, השתמש בתאריך היום כברירת מחדל.
                DateOnly filterDate = !string.IsNullOrEmpty(date) ? DateOnly.ParseExact(date, "yyyy-MM-dd", CultureInfo.InvariantCulture) : DateOnly.FromDateTime(DateTime.Today);
                // סנן לפי התאריך (בין אם הוא סופק או ברירת מחדל)
                query = query.Where(m => m.MeetingDate == filterDate);

                // סנן לפי הפרמטרים האחרים שסופקו
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
                    var teacher = await _context.Users
                        .FirstOrDefaultAsync(u => u.Name == teacherName && u.UserTypeId == 2);

                    if (teacher != null)
                    {
                        query = query.Where(m => m.TeacherId == teacher.UserId);
                    }
                }

                int totalCount = await query.CountAsync();

                var meetings = await query
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return (meetings, totalCount, null);
            }
            catch (Exception ex)
            {
                return (null, 0, ex.Message);
            }
        }
    }
}