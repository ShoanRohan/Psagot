using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public interface IDayDL
    {
        Task<(IEnumerable<Day> Day, string ErrorMessage)> GetAllDays();
        Task<(Day Day, string ErrorMessage)> GetDayById(int id);

        Task<(Day Day, string ErrorMessage)> AddDay(Day day);
        Task<(Day Day, string ErrorMessage)> UpdateDay(Day day);

    }
}
