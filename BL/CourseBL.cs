<<<<<<< HEAD
﻿using System;
=======
﻿using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;
using System;
>>>>>>> ee8701327183736feeee9d3447c1bd34682ec980
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
