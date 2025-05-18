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
        Task<(Meeting Meeting, string ErrorMessage)> GetMeetingById(int meetingId);
        Task<(Meeting Meeting, string ErrorMessage)> UpdateMeeting(Meeting meeting);
        Task<(IEnumerable<Meeting> Meeting, string ErrorMessage)> GetAllMeetings();
        Task<(Meeting Meeting, string ErrorMessage)> AddMeeting(Meeting meeting);
        Task<(IEnumerable<Meeting> Meetings, int totalRecords, string ErrorMessage)> GetMeetings(
           string userName, string courseName, string subjectName, string date, int page, int rows);

        }
}
