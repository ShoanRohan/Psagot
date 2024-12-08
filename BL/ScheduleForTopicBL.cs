using AutoMapper;
using DL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ScheduleForTopicBL
    {
        private readonly IMapper _mapper;

        public ScheduleForTopicBL(IMapper mapper)
        {
            _mapper = mapper;
        }
    }
}
