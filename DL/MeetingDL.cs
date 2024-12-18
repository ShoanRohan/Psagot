using Entities.Contexts;
using Entities.Models;
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
    }
}
