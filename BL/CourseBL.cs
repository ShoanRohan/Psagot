
﻿using AutoMapper;
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


        public async Task<(CourseDTO Course, string ErrorMessage)> UpdateCourse(CourseDTO course)
        {
            var courseDetails = _mapper.Map<Course>(course);
            var (updatedCourse, errorMessage) = await _courseDL.UpdateCourse(courseDetails);

            if (updatedCourse == null) return (null, errorMessage);

            return (_mapper.Map<CourseDTO>(updatedCourse), null);
        }

    }
}
