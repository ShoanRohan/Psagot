using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class MeetingBL : IMeetingBL
    {
        private readonly IMeetingDL _meetingDL;
        private readonly IMapper _mapper;

        public MeetingBL(IMeetingDL meetingDL, IMapper mapper)
        {
            _meetingDL = meetingDL;
            _mapper = mapper;
        }

        public async Task<(MeetingDTO MeetingDTO, string ErrorMessage)> UpdateMeeting(MeetingDTO meetingDTO)
        {
            var meetingEntity = _mapper.Map<Meeting>(meetingDTO);
            var (updatedMeeting, errorMessage) = await _meetingDL.UpdateMeeting(meetingEntity);

            if (updatedMeeting == null) return (null, errorMessage);

            return (_mapper.Map<MeetingDTO>(updatedMeeting), null);

        }

        public async Task<(MeetingDTO Meeting, string ErrorMessage)> GetMeetingById(int meetingId)
        {
            var (meeting, errorMessage) = await _meetingDL.GetMeetingById(meetingId);
            if (meeting == null) return (null, errorMessage);

            return (_mapper.Map<MeetingDTO>(meeting), null);
        }

        public async Task<(IEnumerable<MeetingDTO> Meetings, string ErrorMessage)> GetAllMeetings()
        {
            var (meetings, errorMessage) = await _meetingDL.GetAllMeetings();
            if (meetings == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<MeetingDTO>>(meetings), null);
        }

        public async Task<(MeetingDTO Meeting, string ErrorMessage)> AddMeeting(MeetingDTO meetingDTO)
        {

            var meeting = _mapper.Map<Meeting>(meetingDTO);
            var (addedMeeting, errorMessage) = await _meetingDL.AddMeeting(meeting);

            if (addedMeeting == null) return (null, errorMessage);

            return (_mapper.Map<MeetingDTO>(addedMeeting), null);
        }
        public async Task<(ListOfMeetingsForTopicDTO Result, string ErrorMessage)> SearchMeetings(int? courseId, int? topicId, string teacherName, string? date, int pageNumber, int pageSize)
        {
            try
            {
                var (meetings, totalCount, errorMessage) = await _meetingDL.SearchMeetings(courseId, topicId, teacherName, date, pageNumber, pageSize);

                if (meetings == null)
                {
                    return (null, errorMessage ?? "Search results were null.");
                }
                var meetingsDtoList = _mapper.Map<List<MeetingDTO>>(meetings);

                var result = new ListOfMeetingsForTopicDTO
                {
                    Meetings = meetingsDtoList,
                    TotalCount = totalCount
                };

                return (result, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}
