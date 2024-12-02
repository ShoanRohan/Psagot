<<<<<<< HEAD
﻿using System;
=======
﻿using Entities.Contexts;
using Entities.Models;
using System;
>>>>>>> ee8701327183736feeee9d3447c1bd34682ec980
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
<<<<<<< HEAD
    public class CourseDL
    {
=======
    public class CourseDL : ICourseDL
    {
        private readonly PsagotDbContext _context;

        public CourseDL(PsagotDbContext context)
        {
            _context = context;
        }


        public async Task<(Course Course, string ErrorMessage)> UpdateCourse(Course course)
        {
            try
            {
                _context.Set<Course>().Update(course);
                await _context.SaveChangesAsync();
                return (course, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        
            
        
>>>>>>> ee8701327183736feeee9d3447c1bd34682ec980
    }
}
