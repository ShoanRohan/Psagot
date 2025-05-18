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
        Task<(MeetingDTO Meeting, string ErrorMessage)> GetMeetingById(int meetingId);
        Task<(MeetingDTO MeetingDTO, string ErrorMessage)> UpdateMeeting(MeetingDTO meetingDTO);
        Task<(IEnumerable<MeetingDTO> Meetings, string ErrorMessage)> GetAllMeetings();
        Task<(MeetingDTO Meeting, string ErrorMessage)> AddMeeting(MeetingDTO meetingDTO);
        Task<(ListOfMeetingsForTopicDTO Result, string ErrorMessage)> SearchMeetings(int? courseId, int? topicId, string teacherName, string? date, int pageNumber, int pageSize);
    }
}
