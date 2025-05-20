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
        Task<(MeetingDTO Meeting, string ErrorMessage)> GetMeetingById(int meetingId);
        Task<(MeetingDTO MeetingDTO, string ErrorMessage)> UpdateMeeting(MeetingDTO meetingDTO);
        Task<(IEnumerable<MeetingDTO> Meetings, string ErrorMessage)> GetAllMeetings();
        Task<(MeetingDTO Meeting, string ErrorMessage)> AddMeeting(MeetingDTO meetingDTO);
        Task<(IEnumerable<MeetingDTO> Meetings, int totalRecords, string ErrorMessage)> GetMeetings(
         string userName, string courseName, string subjectName, string date, int page, int rows);
        Task<(MeetingDTO Meeting, string ErrorMessage)> DeleteMeeting(int meetingId);
    }
}
