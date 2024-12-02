<<<<<<< HEAD
﻿using System;
=======
﻿using Entities.DTO;
using System;
>>>>>>> ee8701327183736feeee9d3447c1bd34682ec980
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
<<<<<<< HEAD
   public interface ICourseBL
    {
=======
    public interface ICourseBL
    {
        Task<(CourseDTO Course, string ErrorMessage)> UpdateCourse(CourseDTO course);

>>>>>>> ee8701327183736feeee9d3447c1bd34682ec980
    }
}
