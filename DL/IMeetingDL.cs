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
        Task<(ListOfMeetingsForTopic Result, string ErrorMessage)> SearchMeetings(int? courseId, int? topicId, string teacherName, DateOnly? date, int pageNumber = 1, int pageSize = 20);
    }
}
