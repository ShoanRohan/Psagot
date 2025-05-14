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

        public async Task<(IEnumerable<Meeting> Meetings, string ErrorMessage)> GetMeetingsByRange(DateOnly startDate, DateOnly endDate)
        {
            try
            {
                var meetings = await _context.Meetings
                    .Where(m => m.MeetingDate >= startDate && m.MeetingDate <= endDate)
                    .ToListAsync();
                if (meetings == null || !meetings.Any())
                    return (null, "No meetings found");
                return (meetings, null);
            }
            catch (Exception ex)
            {
                return (null, "An error occurred while retrieving meetings");
            }
        }

        public async Task<(IEnumerable<Meeting>, int)> GetMeetingsByPage(int page, int pageSize)
        {
            try
            {
                var query = _context.Meetings.AsQueryable();

                int totalCount = await query.CountAsync();
              
                List<Meeting> meetings = await query
                    .OrderBy(m => m.MeetingDate) 
                    .Skip((page - 1) * pageSize) 
                    .Take(pageSize) 
                    .ToListAsync();

                return (meetings, totalCount);
            }
            catch (Exception ex)
            {
                return (Enumerable.Empty<Meeting>(), 0);
            }
        }
    }
}
