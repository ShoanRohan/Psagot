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

        public async Task<(IEnumerable<Meeting> Meeting, string ErrorMessage)> GetAllMeetings()
        {
            try
            {
                var meeting = await _context.Set<Meeting>().ToListAsync();
                return (meeting, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(IEnumerable<UserType> UserTypes, string ErrorMessage)> GetAllUserTypes()
        {
            try
            {
                var userTypes = await _context.Set<UserType>().ToListAsync();
                return (userTypes, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}
