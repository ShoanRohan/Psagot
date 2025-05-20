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

        public async Task<(IEnumerable<Meeting> Meetings,int totalRecords, string ErrorMessage)> GetMeetings(
          string userName, string courseName, string subjectName, string date, int page, int rows)
        {
            try
            {
                var query = _context.Set<Meeting>().AsQueryable();

                
                if (!string.IsNullOrEmpty(userName))
                    query = query.Where(m => m.ScheduleForTopic.Topic.Teacher.Name.Contains(userName));

               
                if (!string.IsNullOrEmpty(courseName))
                    query = query.Where(m => m.ScheduleForTopic.Topic.Course.Name.Contains(courseName));

                
                if (!string.IsNullOrEmpty(subjectName))
                    query = query.Where(m => m.ScheduleForTopic.Topic.Name.Contains(subjectName));

                
                if (!string.IsNullOrEmpty(date) && DateOnly.TryParse(date, out DateOnly parsedDate))
                    query = query.Where(m => m.MeetingDate== parsedDate);

                // סופרים כמה רשומות יש אחרי הסינון
                int totalRecords = await query.CountAsync();

                // מבצעים את הדפדוף לפי מספר עמוד ומספר שורות
                var meetings = await query
                    .Skip((page - 1) * rows)
                    .Take(rows)
                    .ToListAsync();

                return (meetings, totalRecords, null);
            }
            catch (Exception ex)
            {
                return (null,0, $"Error fetching meetings: {ex.Message}");
            }
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

        public async Task<(Meeting Meeting, string ErrorMessage)> DeleteMeeting(int meetingId)
        {
            try
            {
                var meeting = await _context.Set<Meeting>().FindAsync(meetingId);
                if (meeting == null)
                {
                    return (null, "Meeting not found.");
                }

                _context.Set<Meeting>().Remove(meeting);
                await _context.SaveChangesAsync();
                return (meeting, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}
