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

        
        public async Task<(MeetingDTO Meeting, string ErrorMessage)> AddNewMeeting(MeetingDTO meetingDTO)
        {
           
            var meeting = _mapper.Map<Meeting>(meetingDTO);
            var (addedMeeting, errorMessage) = await _meetingDL.AddNewMeeting(meeting);

            if (addedMeeting == null) return (null, errorMessage);

            return (_mapper.Map<MeetingDTO>(addedMeeting), null);


        }

        public async Task<(IEnumerable<MeetingDTO> meetings, string ErrorMessage)> GetAllMeetings()
        {
            var (meetings, errorMessage) = await _meetingDL.GetAllMeetings();
            if (meetings == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<MeetingDTO>>(meetings), null);
        }





    }
}
