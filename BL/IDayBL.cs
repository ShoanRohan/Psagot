using DL;
using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface IDayBL
    {
        Task<(IEnumerable<DayDTO> Days, string ErrorMessage)> GetAllDays();
        Task<(DayDTO Day, string ErrorMessage)> GetDayById(int id);
        Task<(DayDTO Day, string ErrorMessage)> AddDay(DayDTO dayDTO);
        Task<(DayDTO Day, string ErrorMessage)> UpdateDay(DayDTO dayDTO);
    }
}
