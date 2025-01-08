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
        
        public async Task<(MeetingDTO Meeting, string ErrorMessage)> AddMeeting(MeetingDTO meetingDTO)
        {
           
            var meeting = _mapper.Map<Meeting>(meetingDTO);
            var (addedMeeting, errorMessage) = await _meetingDL.AddMeeting(meeting);

            if (addedMeeting == null) return (null, errorMessage);

            return (_mapper.Map<MeetingDTO>(addedMeeting), null);
        }
    }
}
