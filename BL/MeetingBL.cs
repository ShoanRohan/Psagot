using AutoMapper;
using DL;
using Entities.DTO;
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

        public async Task<(MeetingDTO Meeting, string ErrorMessage)> GetMeetingById(int meetingId)
        {
            var (meeting, errorMessage) = await _meetingDL.GetMeetingById(meetingId);
            if (meeting == null) return (null, errorMessage);

            return (_mapper.Map<MeetingDTO>(meeting), null);
        }
    }
}
