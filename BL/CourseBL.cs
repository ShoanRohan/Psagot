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
        public async Task<(CourseDTO Course, string ErrorMessage)> GetCoursebById(int id)
        {
            var (Course, errorMessage) = await _courseDL.GetCourseById(id);
            if (Course == null) return (null, errorMessage);

            return (_mapper.Map<CourseDTO>(Course), null);
        }

        public Task<(CourseDTO Course, string ErrorMessage)> GetCourseById(int id)
        {
            throw new NotImplementedException();
        }

        Task<(Course Course, string errorMessage)> ICourseBL.GetCourseById(int id)
        {
            throw new NotImplementedException();
        }
    }
}
