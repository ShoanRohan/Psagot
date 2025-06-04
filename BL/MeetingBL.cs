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

            // חישוב שיבוץ תקין וסיבה
            var reasons = new List<string>();
            bool isValid = true;

            // בדיקת התאמה לפי נושא
            if (meeting.Topic != null && meeting.DayId.HasValue && meeting.StartTime.HasValue)
            {
                var topicSchedules = meeting.Topic.ScheduleForTopics;
                var matchedTime = topicSchedules.Any(s =>
                    s.DayId == meeting.DayId &&
                    s.StartTime <= meeting.StartTime.Value &&
                    s.EndTime > meeting.StartTime.Value);

                if (!matchedTime)
                {
                    reasons.Add("המפגש לא מתקיים ביום או בשעה של הנושא");
                    isValid = false;
                }
            }

            // בדיקת התאמה לפי מאפייני חדר
            if (meeting.Room != null)
            {

                if ((meeting.Topic.Computers && !meeting.Room.Computers) ||
                    (meeting.Topic.Projector && !meeting.Room.Projector) ||
                    (meeting.Topic.Microphone && !meeting.Room.Speakers))
                {
                    reasons.Add("החדר לא תואם למאפייני הנושא");
                    isValid = false;
                }

            }

            // בדיקת התאמה לפי קורס
            if (meeting.Course != null && meeting.DayId.HasValue && meeting.StartTime.HasValue)
            {
                var courseDays = meeting.Course.DaysForCourses;
                var matchedDay = courseDays.Any(d =>
                    d.DayId == meeting.DayId &&
                    d.StartTime <= meeting.StartTime.Value &&
                    d.EndTime > meeting.StartTime.Value);

                if (!matchedDay)
                {
                    reasons.Add("המפגש לא ביום או בשעה של הקורס");
                    isValid = false;
                }
            }

            // בדיקת קיבולת חדר מול כמות תלמידים
            if (meeting.Course != null && meeting.Room != null)
            {
                if (meeting.Course.NumberOfStudents > meeting.Room.Capacity)
                {
                    reasons.Add("יותר תלמידים ממקומות בחדר");
                    isValid = false;
                }
            }

            // עדכון במידה ויש שינוי
            if (meeting.IsValid != isValid)
            {
                meeting.IsValid = isValid;
                await _meetingDL.UpdateMeeting(meeting);
            }

            // מיפוי והוספת שדות חדשים
            var meetingDto = _mapper.Map<MeetingDTO>(meeting);
            meetingDto.IsValid = isValid;
            meetingDto.Reason = string.Join("; ", reasons);

            return (meetingDto, null);
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