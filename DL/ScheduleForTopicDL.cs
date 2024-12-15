using Entities.Contexts;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class ScheduleForTopicDL: IScheduleForTopicDL
    {
        private readonly PsagotDbContext _context;

        public ScheduleForTopicDL(PsagotDbContext context)
        {
            _context = context;
        }

        public async Task<(UserType UserType, string ErrorMessage)> GetAllScheduleForTopicByTopicId(int id)
        {
            try
            {
                var userType = await _context.Set<UserType>().FindAsync(id);
                return (userType, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}
