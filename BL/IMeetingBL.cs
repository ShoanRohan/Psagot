using Entities.DTO;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface IMeetingBL
    {
        Task<(Meeting? meeting, string? errorMessage)> AddMeeting(MeetingDTO meetingDTO);
    }
}
