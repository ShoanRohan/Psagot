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
    public class DaysForCourseBL : IDaysForCourseBL
    {
        private readonly IDaysForCourseDL _daysForCourseDL;
        private readonly ITopicDL _topicDL;
        private readonly IMapper _mapper;

        public DaysForCourseBL(IDaysForCourseDL daysForCourseDL, ITopicDL topicDL, IMapper mapper)
        {
            _daysForCourseDL = daysForCourseDL;
            _topicDL = topicDL;
            _mapper = mapper;
        }

        public async Task<(DaysForCourseDTO DaysForCourse, string ErrorMessage)> AddDaysForCourse(DaysForCourseRequestDTO requestDTO)
        {
            DaysForCourse daysForCourse = _mapper.Map<DaysForCourse>(requestDTO);
            var (addedDaysForCourse, errorMessage) = await _daysForCourseDL.AddDaysForCourse(daysForCourse);

            if (addedDaysForCourse == null) return (null, errorMessage);

            return (_mapper.Map<DaysForCourseDTO>(addedDaysForCourse), null);
        }

        public async Task<(IEnumerable<DaysForCourseDTO> DaysForCourse, string ErrorMessage)> GetAllDaysForCourse()
        {
            var (daysForCourse, errorMessage) = await _daysForCourseDL.GetAllDaysForCourse();
            if (daysForCourse == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<DaysForCourseDTO>>(daysForCourse), null);
        }

        public async Task<(DaysForCourseDTO DayForCourse, string ErrorMessage)> GetDaysForCourseById(int id)
        {
            var (daysForCourse, errorMessage) = await _daysForCourseDL.GetDaysForCourseById(id);
            if (daysForCourse == null) return (null, errorMessage);

            return (_mapper.Map<DaysForCourseDTO>(daysForCourse), null);
        }

        public async Task<(IEnumerable<DaysForCourseDTO> DaysForCourse, string ErrorMessage)> GetDaysForCourseByCourseId(int courseId)
        {
            var (DaysForCourse, errorMessage) = await _daysForCourseDL.GetDaysForCourseByCourseId(courseId);
            if (DaysForCourse == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<DaysForCourseDTO>>(DaysForCourse), null);
        }

        public async Task<(DaysForCourseDTO DaysForCourse, string ErrorMessage)> UpdateDaysForCourse(DaysForCourseRequestDTO requestDTO)
        {
            DaysForCourse daysForCourse = _mapper.Map<DaysForCourse>(requestDTO);
            var (updateDaysForCourse, errorMessage) = await _daysForCourseDL.UpdateDaysForCourse(daysForCourse);

            if (updateDaysForCourse == null) return (null, errorMessage);

            return (_mapper.Map<DaysForCourseDTO>(updateDaysForCourse), null);
        }

        public async Task<(bool IsDeleted, string ErrorMessage)> DeleteDaysForCourse(int daysForCourseId)
        {
            var (isDeleted, errorMessage) = await _daysForCourseDL.DeleteDaysForCourse(daysForCourseId);

            if (!isDeleted)
            {
                return (false, errorMessage);
            }

            return (true, null);
        }

        public async Task<(bool HasConflicts, string Message)> CheckTopicsConflicts(int courseId, List<DaysForCourseRequestDTO> newDays)
        {
            var (topicsList, topicErrorMessage) = await _topicDL.GetAllTopicsForCourseByCourseId(courseId);

            if (topicsList == null)
            {
                return (true, $"שגיאה בשליפת נושאים: {topicErrorMessage}");
            }

            foreach (var topic in topicsList)
            {
                var schedules = topic.ScheduleForTopics;

                if (schedules == null || !schedules.Any())
                {
                    continue;
                }

                foreach (var schedule in schedules)
                {
                    var isScheduleCovered = newDays.Any(d =>
                        d.DayId == schedule.DayId &&
                        schedule.StartTime >= d.StartTime &&
                        schedule.EndTime <= d.EndTime);

                    if (!isScheduleCovered)
                    {
                        return (true, "בעקבות השינוי בימים יש נושאים שמשובצים בצורה לא תקינה האם לשמור בכל זאת?");
                    }
                }
            }
            return (false, null);
        }
    }
}
