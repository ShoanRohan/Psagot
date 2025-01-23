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

        public async Task<(CourseDTO Course, string ErrorMessage)> AddCourse(CourseDTO courseDTO)
        {
            var course = _mapper.Map<Course>(courseDTO);
            var (addedCourse, errorMessage) = await _courseDL.AddCourse(course);

            if (addedCourse == null) return (null, errorMessage);

            return (_mapper.Map<CourseDTO>(addedCourse), null);
        }
        public async Task<bool> DeleteCourse(int id)
        {
            int u = _mapper.Map<int>(id);
            bool isRemove = await _courseDL.DeleteCourse(u);
            return isRemove;
        }

    }
}
