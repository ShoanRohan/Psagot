using Entities.Models;
using Entities.Contexts; 
using System;
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

        public async Task<Meeting?> AddMeeting(Meeting meeting)
        {
            try
            {
                _context.Meetings.Add(meeting);
                await _context.SaveChangesAsync();
                return meeting;
            }
            catch (Exception ex)
            {
               
                return null;
            }
        }
    }
}
