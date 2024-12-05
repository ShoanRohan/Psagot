using Entities.Contexts;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public class DayDL : IDayDL
    {
        private readonly PsagotDbContext _context;

        public DayDL(PsagotDbContext context)
        {
            _context = context;
        }
        public async Task<(Day Day, string ErrorMessage)> GetDayById(int id)
        {
            try
            {
                var day = await _context.Set<Day>().FindAsync(id);
                return (day, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(IEnumerable<Day> Day, string ErrorMessage)> GetAllDays()
        {
            try
            {
                var days = await _context.Set<Day>().ToListAsync();
                return (days, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(Day Day, string ErrorMessage)> AddDay(Day day)
        {
            try
            {
                var addedDay = await _context.Set<Day>().AddAsync(day);
                await _context.SaveChangesAsync();
                return (addedDay.Entity, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(Day Day, string ErrorMessage)> UpdateDay(Day day)
        {
            try
            {
                _context.Set<Day>().Update(day);
                await _context.SaveChangesAsync();
                return (day, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }


    }
}
