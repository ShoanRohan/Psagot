using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface IMeetingBL
    {

        //  public Task AddNewMeeting(MeetingDTO meetingDTO);

        public Task<(MeetingDTO Meeting, string ErrorMessage)> AddNewMeeting(MeetingDTO meetingDTO);

        Task<(IEnumerable<MeetingDTO> meetings, string ErrorMessage)> GetAllMeetings();

    }
}
