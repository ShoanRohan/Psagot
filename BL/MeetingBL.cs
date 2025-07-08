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

        private (List<string> Reasons, bool IsValid) CalculateMeetingValidityAndReason(Meeting meeting)
        {
            var reasons = new List<string>();
            bool isValid = true;

            // 1. בדיקת התאמה לפי נושא (אם המפגש חלק מנושא)
            if (meeting.TopicId.HasValue && meeting.Topic != null && meeting.DayId.HasValue && meeting.StartTime.HasValue)
            {
                var topicSchedules = meeting.Topic.ScheduleForTopics;
                if (topicSchedules != null && topicSchedules.Any())
                {
                    var matchedTime = topicSchedules.Any(s =>
                        s.DayId == meeting.DayId &&
                        s.StartTime <= meeting.StartTime.Value &&
                        s.EndTime > meeting.StartTime.Value);

                    if (!matchedTime)
                    {
                        reasons.Add("המפגש אינו מתקיים ביום או בשעה המוגדרים לנושא");
                        isValid = false;
                    }
                }
            }

            // 2. בדיקת התאמה לפי קורס (אם המפגש חד פעמי וחלק מקורס)
            if (!meeting.IsPartOfSchedule && meeting.CourseId.HasValue && meeting.Course != null && meeting.DayId.HasValue && meeting.StartTime.HasValue)
            {
                var courseDays = meeting.Course.DaysForCourses;
                if (courseDays != null && courseDays.Any())
                {
                    var matchedDay = courseDays.Any(d =>
                        d.DayId == meeting.DayId &&
                        d.StartTime <= meeting.StartTime.Value &&
                        d.EndTime > meeting.StartTime.Value);

                    if (!matchedDay)
                    {
                        reasons.Add("המפגש אינו מתקיים ביום או בשעה המוגדרים לקורס");
                        isValid = false;
                    }
                }
            }

            // 3. בדיקת התאמה לפי מאפייני חדר (אם המפגש משויך לנושא)
            if (meeting.TopicId.HasValue && meeting.Topic != null && meeting.Room != null)
            {
                var missingFeatures = new List<string>();

                if (meeting.Topic.Computers && !meeting.Room.Computers)
                {
                    missingFeatures.Add("מחשבים");
                }
                if (meeting.Topic.Projector && !meeting.Room.Projector)
                {
                    missingFeatures.Add("מקרן");
                }
                if (meeting.Topic.Microphone && !meeting.Room.Speakers)
                {
                    missingFeatures.Add("מערכת הגברה");
                }

                if (missingFeatures.Any())
                {
                    reasons.Add($"החדר אינו מתאים למאפייני הנושא הנדרשים: {string.Join(", ", missingFeatures)}");
                    isValid = false;
                }
            }

            // 4. בדיקת קיבולת חדר מול כמות תלמידים (אם המפגש משויך לקורס)
            if (meeting.CourseId.HasValue && meeting.Course != null && meeting.Room != null)
            {
                if (meeting.Course.NumberOfStudents > meeting.Room.Capacity)
                {
                    reasons.Add($"כמות התלמידים בקורס ({meeting.Course.NumberOfStudents}) גדולה מקיבולת החדר ({meeting.Room.Capacity})");
                    isValid = false;
                }
            }

            return (reasons, isValid);
        }



        public async Task<(MeetingDTO MeetingDTO, string ErrorMessage)> UpdateMeeting(MeetingDTO meetingDTO)
        {
            try
            {
                // קודם כל, קבל את המפגש הקיים עם כל ה-Navigation Properties
                var (existingMeeting, getError) = await _meetingDL.GetMeetingById(meetingDTO.MeetingId);
                if (existingMeeting == null)
                {
                    return (null, getError ?? "מפגש לא נמצא");
                }

                // עדכן את השדות הנדרשים
                existingMeeting.ScheduleForTopicId = meetingDTO.ScheduleForTopicId;
                existingMeeting.MeetingNumberForTopic = meetingDTO.MeetingNumberForTopic;
                existingMeeting.RoomId = meetingDTO.RoomId;
                existingMeeting.DayId = meetingDTO.DayId;
                existingMeeting.StartTime = meetingDTO.StartTime;
                existingMeeting.EndTime = meetingDTO.EndTime;
                existingMeeting.IsPartOfSchedule = meetingDTO.IsPartOfSchedule;
                existingMeeting.CourseId = meetingDTO.CourseId;
                existingMeeting.TopicId = meetingDTO.TopicId;
                existingMeeting.TeacherId = meetingDTO.TeacherId;
                existingMeeting.MeetingDate = meetingDTO.MeetingDate;

                

                // חשב את התקינות והסיבה
                var (reasons, isValid) = CalculateMeetingValidityAndReason(existingMeeting);
                existingMeeting.IsValid = isValid;



                // עדכן את המפגש בDB
                var (updatedMeeting, errorMessage) = await _meetingDL.UpdateMeeting(existingMeeting);
                if (updatedMeeting == null)
                {
                    return (null, errorMessage);
                }

                // החזר DTO עם הסיבה המחושבת
                var resultDto = _mapper.Map<MeetingDTO>(updatedMeeting);
                resultDto.IsValid = isValid;
                resultDto.Reason = isValid ? null : string.Join("; ", reasons);

                return (resultDto, null);
            }
            catch (Exception ex)
            {
                return (null, $"שגיאה בעדכון המפגש: {ex.Message}");
            }
        }


        public async Task<(MeetingDTO Meeting, string ErrorMessage)> GetMeetingById(int meetingId)
        {
            try
            {
                var (meeting, errorMessage) = await _meetingDL.GetMeetingById(meetingId);
                if (meeting == null)
                {
                    return (null, errorMessage);
                }

                // חשב את התקינות והסיבה העדכניים
                var (reasons, isValid) = CalculateMeetingValidityAndReason(meeting);

                // אם יש שינוי בסטטוס IsValid, עדכן את ה-DB
                if (meeting.IsValid != isValid)
                {
                    meeting.IsValid = isValid;
                    await _meetingDL.UpdateMeeting(meeting);
                }

                // מיפוי ל-DTO עם הסיבה המחושבת
                var meetingDto = _mapper.Map<MeetingDTO>(meeting);
                meetingDto.IsValid = isValid;
                meetingDto.Reason = isValid ? null : string.Join("; ", reasons);

                return (meetingDto, null);
            }
            catch (Exception ex)
            {
                return (null, $"שגיאה בקבלת המפגש: {ex.Message}");
            }
        }

        public async Task<(IEnumerable<MeetingDTO> Meetings, string ErrorMessage)> GetAllMeetings()
        {
            try
            {
                var (meetings, errorMessage) = await _meetingDL.GetAllMeetings();
                if (meetings == null)
                {
                    return (null, errorMessage);
                }

                var meetingDtos = new List<MeetingDTO>();
                var meetingsToUpdate = new List<Meeting>();

                foreach (var meeting in meetings)
                {
                    var (reasons, isValid) = CalculateMeetingValidityAndReason(meeting);

                    // אם יש שינוי בתקינות, הוסף לרשימת העדכונים
                    if (meeting.IsValid != isValid)
                    {
                        meeting.IsValid = isValid;
                        meetingsToUpdate.Add(meeting);
                    }

                    var meetingDto = _mapper.Map<MeetingDTO>(meeting);
                    meetingDto.IsValid = isValid;
                    meetingDto.Reason = isValid ? null : string.Join("; ", reasons);
                    meetingDtos.Add(meetingDto);
                }

                // עדכן את כל המפגשים ששונו בDB
                foreach (var meetingToUpdate in meetingsToUpdate)
                {
                    await _meetingDL.UpdateMeeting(meetingToUpdate);
                }

                return (meetingDtos, null);
            }
            catch (Exception ex)
            {
                return (null, $"שגיאה בקבלת המפגשים: {ex.Message}");
            }
        }


        public async Task<(MeetingDTO Meeting, string ErrorMessage)> AddMeeting(MeetingDTO meetingDTO)
        {
            try
            {
                var meeting = _mapper.Map<Meeting>(meetingDTO);

                // לפני הוספה, חשב את מספר המפגש לנושא
                if (meetingDTO.TopicId.HasValue)
                {
                    var (allMeetings, _) = await _meetingDL.GetAllMeetings();
                    if (allMeetings != null)
                    {
                        var topicMeetings = allMeetings
                            .Where(m => m.TopicId == meetingDTO.TopicId)
                            .Where(m => m.MeetingDate <= meetingDTO.MeetingDate)
                            .Count();

                        meeting.MeetingNumberForTopic = topicMeetings + 1;
                    }
                }

                var (addedMeeting, errorMessage) = await _meetingDL.AddMeeting(meeting);
                if (addedMeeting == null)
                {
                    return (null, errorMessage);
                }

                // אחרי ההוספה, חשב את התקינות והסיבה
                var (addedMeetingWithNav, _) = await _meetingDL.GetMeetingById(addedMeeting.MeetingId);
                if (addedMeetingWithNav != null)
                {
                    var (reasons, isValid) = CalculateMeetingValidityAndReason(addedMeetingWithNav);

                    if (addedMeetingWithNav.IsValid != isValid)
                    {
                        addedMeetingWithNav.IsValid = isValid;
                        await _meetingDL.UpdateMeeting(addedMeetingWithNav);
                    }

                    var resultDto = _mapper.Map<MeetingDTO>(addedMeetingWithNav);
                    resultDto.IsValid = isValid;
                    resultDto.Reason = isValid ? null : string.Join("; ", reasons);

                    return (resultDto, null);
                }

                return (_mapper.Map<MeetingDTO>(addedMeeting), null);
            }
            catch (Exception ex)
            {
                return (null, $"שגיאה בהוספת המפגש: {ex.Message}");
            }
        }


        public async Task<(MeetingDTO Meeting, string ErrorMessage)> DeleteMeeting(int meetingId)
        {
            var (meeting, errorMessage) = await _meetingDL.DeleteMeeting(meetingId);
            if (meeting == null) return (null, errorMessage);

            return (_mapper.Map<MeetingDTO>(meeting), null);
        }


    }
}
