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

        public async Task<(IEnumerable<EventDTO> Events, string ErrorMessage)> GetMeetingsByRange(DateOnly startDate, DateOnly endDate)
        {
            try
            {
                var (meetings, errorMessage) = await _meetingDL.GetMeetingsByRange(startDate, endDate);
                if (meetings == null || !meetings.Any())
                    return (null, errorMessage ?? "No meetings found");
                var events = _mapper.Map<IEnumerable<EventDTO>>(meetings);
                return (events, null);
            }
            catch (Exception ex)
            {
                return (null, "An error occurred while processing meetings.");
            }
        }


        public async Task<(IEnumerable<MeetingDTO> Meetings, int TotalCount)> GetMeetingsByPage(int page, int pageSize)
        {
            var (meetings, totalCount) = await _meetingDL.GetMeetingsByPage(page, pageSize);
            
            if (meetings == null)
            {return (null,null,errorMessage);}
           
            return (_mapper.Map<IEnumerable<MeetingDTO>>(meetings), totalCount);
        }


    }
}
