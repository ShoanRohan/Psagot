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

        public async Task<(IEnumerable<MeetingDTO> Meetings, int totalRecords, string ErrorMessage)> GetMeetings(
        string userName, string courseName, string subjectName, string date, int page, int rows)
        {

            var (meetings,totalRecords,  errorMessage) = await _meetingDL.GetMeetings(userName,courseName, subjectName,date,page,  rows);
            if (meetings == null) return (null,0, errorMessage);

            return (_mapper.Map<IEnumerable<MeetingDTO>>(meetings),totalRecords, null);
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

       
    }
}
