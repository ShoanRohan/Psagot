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
    public class CourseBL : ICourseBL
    {
        private readonly ICourseDL _courseDL;
        private readonly IMapper _mapper;

        public CourseBL(ICourseDL courseDL, IMapper mapper)
        {
            _courseDL = courseDL;
            _mapper = mapper;
        }

        public async Task<(CourseDTO Course, string ErrorMessage)> GetCourseById(int id)
        {
            var (course, errorMessage) = await _courseDL.GetCourseById(id);
            if (course == null) return (null, errorMessage);

            return (_mapper.Map<CourseDTO>(course), null);
        }

        public async Task<(IEnumerable<CourseDTO> Courses, string ErrorMessage)> GetAllCourses()
        {
            var (courses, errorMessage) = await _courseDL.GetAllCourses();

            if (courses == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<CourseDTO>>(courses), null);
        }
        //public async Task<(IEnumerable<CourseDTO> Courses, int TotalCount, string ErrorMessage)> GetPaginatedCourses(int page, int pageSize)
        //{
        //    var skip = (page - 1) * pageSize;
        //    var (courses, errorMessage) = await _courseDL.GetPaginatedCourses(skip, pageSize);
        //    var totalCount = _courseDL.GetTotalCoursesCount();
        //    if (courses == null) return (null, 0, errorMessage);

        //    return (_mapper.Map<IEnumerable<CourseDTO>>(courses), totalCount, null);
        //}
        public async Task<(CourseDTO Course, string ErrorMessage)> AddCourse(CourseDTO courseDTO)
        {
            var course = _mapper.Map<Course>(courseDTO);
            var (addedCourse, errorMessage) = await _courseDL.AddCourse(course);

            if (addedCourse == null) return (null, errorMessage);

            return (_mapper.Map<CourseDTO>(addedCourse), null);
        }
        public async Task<(CourseDTO Course, string ErrorMessage)> UpdateCourse(CourseDTO courseDTO)
        {
            var course = _mapper.Map<Course>(courseDTO);
            var (updatedCourse, errorMessage) = await _courseDL.UpdateCourse(course);

            if (updatedCourse == null) return (null, errorMessage);

            return (_mapper.Map<CourseDTO>(updatedCourse), null);
        }
        public async Task<(IEnumerable<CourseDTO> Courses, int TotalCount, string ErrorMessage)> GetPaginatedFilteredCourses(
            int page,
            int pageSize,
           int? courseId,
           string courseName,
           string coordinatorName,
           int? year)

        {
            var skip = (page - 1) * pageSize;

            var (courses,totalCount, ErrorMessage) = await _courseDL.GetPaginatedFilteredCourses(skip, pageSize, courseId, courseName, coordinatorName, year);


            if (courses == null) return (null,0, ErrorMessage);


            return (_mapper.Map<IEnumerable<CourseDTO>>(courses), totalCount, null);

        }



    }
}
