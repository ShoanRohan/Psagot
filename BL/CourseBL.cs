using AutoMapper;
using DL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    internal class CourseBL : ICourseBL
    {
        ICourseDL _courseDL;
        IMapper _mapper;

        public CourseBL(IMapper mapper, ICourseDL courseDL)
        {
            _mapper = mapper;
            _courseDL = courseDL;
        }

        public async Task<bool> DeleteCourse(int id)
        {
            int u = _mapper.Map<int>(id);
            bool isRemove = await _courseDL.DeleteCourse(u);
            return isRemove;
        }

    }
}
