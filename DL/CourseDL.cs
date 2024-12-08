﻿using Entities.Contexts;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class CourseDL:ICourseDL
    {
        private readonly PsagotDbContext _context;
        public async Task<(Course Course, string ErrorMessage)> GetCourseById(int id)
        {
            try
            {
                var course = await _context.Set<Course>().FindAsync(id);
                return (course, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

    }
}
