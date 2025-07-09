using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
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
        
        public async Task<(List<MeetingDTO>, string ErrorMessage)> GetMeetingsByDate(string viewType, DateOnly from, DateOnly to)
        {
            try
            {
                if (to < from)
                    return (new List<MeetingDTO>(), "תאריך סיום קטן מתאריך התחלה");

                var meetings = await _meetingDL.GetMeetingsByDate(from, to);

                var meetingDtos = meetings.Select(m => new MeetingDTO
                {
                    MeetingId = m.MeetingId,
                    ScheduleForTopicId = m.ScheduleForTopicId,
                    MeetingNumberForTopic = m.MeetingNumberForTopic,
                    RoomId = m.RoomId,
                    IsValid = m.IsValid,
                    DayId = m.DayId,
                    StartTime = m.StartTime,
                    EndTime = m.EndTime,
                    IsPartOfSchedule = m.IsPartOfSchedule,
                    CourseId = m.ScheduleForTopic?.Topic?.CourseId,
                    TopicId = m.ScheduleForTopic?.TopicId,
                    TeacherId = m.ScheduleForTopic?.Topic?.TeacherId,
                    MeetingDate = m.MeetingDate,
                    Room = m.Room != null
                        ? new RoomDTO
                        {
                            RoomId = m.Room.RoomId,
                            Name = m.Room.Name
                        }
                        : null,
                    Course = m.ScheduleForTopic?.Topic?.Course != null
                        ? new CourseDTO
                        {
                            CourseId = m.ScheduleForTopic.Topic.Course.CourseId,
                            Name = m.ScheduleForTopic.Topic.Course.Name,
                            Color = string.IsNullOrWhiteSpace(m.ScheduleForTopic.Topic.Course.Color)
                                ? "#808080"
                                : m.ScheduleForTopic.Topic.Course.Color
                        }
                        : null,
                    Topic = m.ScheduleForTopic?.Topic != null
                        ? new TopicDTO
                        {
                            TopicId = m.ScheduleForTopic.Topic.TopicId,
                            Name = m.ScheduleForTopic.Topic.Name
                        }
                        : null
                }).ToList();

                return (meetingDtos, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

    }
}


