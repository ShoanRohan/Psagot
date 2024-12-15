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
        public class DayBL : IDayBL
        {
            private readonly IDayDL _dayDL;
            private readonly IMapper _mapper;

            public DayBL(IDayDL dayDL, IMapper mapper)
            {
                _dayDL = dayDL;
                _mapper = mapper;
            }
            public async Task<(DayDTO Day, string ErrorMessage)> GetDayById(int id)
            {
                var (day, errorMessage) = await _dayDL.GetDayById(id);
                if (day == null) return (null, errorMessage);

                return (_mapper.Map<DayDTO>(day), null);
            }

            public async Task<(IEnumerable<DayDTO> Days, string ErrorMessage)> GetAllDays()
            {
                var (days, errorMessage) = await _dayDL.GetAllDays();
                if (days == null) return (null, errorMessage);

                return (_mapper.Map<IEnumerable<DayDTO>>(days), null);
            }
        }
}
