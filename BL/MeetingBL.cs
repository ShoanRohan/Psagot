using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;

namespace BL
{
    public class MeetingBL : IMeetingBL
    {
        private readonly MeetingDL _meetingDl;
        private readonly IMapper _mapper;

        public MeetingBL(IMeetingDL meetingDL, IMapper mapper)
        {
            _meetingDL = meetingDL;
            _mapper = mapper;
        }

        public async Task<(Meeting? meeting, string? errorMessage)> AddMeeting(MeetingDTO meetingDTO)
        {
            try
            {
                var meetingEntity = _mapper.Map<Meeting>(meetingDTO);
                var added = await _meetingDL.AddMeeting(meetingEntity);

                if (added == null)
                    return (null, "שמירה נכשלה");

                return (added, null);
            }
            catch (Exception ex)
            {
                return (null, $"שגיאה בשכבת BL: {ex.Message}");
            }
        }
    }
    
    var addedMeeting = await _meetingDl.AddMeeting(meeting);

            if (addedMeeting == null)
            {
                return (null, "Failed to add meeting.");
            }

          
        }
    }
}


