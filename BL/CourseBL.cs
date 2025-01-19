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
public class CourseBL: ICourseBL
    {
        private readonly ICourseDL _courseDL;
        private readonly IMapper _mapper;

      

        public async Task<(CourseDTO Course, string ErrorMessage)> GetCourseById(int id)
        {
            var (course, errorMessage) = await _courseDL.GetCourseById(id);
            if (course == null) return (null, errorMessage);

            return (_mapper.Map<CourseDTO>(course), null);
        }

  
       
    }
}
