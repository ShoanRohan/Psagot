using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public interface IMeetingDL
    {
        public Task<(Meeting Meeting, string ErrorMessage)> AddMeeting(Meeting meeting);
    }
}
