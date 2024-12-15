using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
  
        public class RoomDTO
        {
            public int RoomId { get; set; }
            public string Name { get; set; } = null!;

        public bool Projector { get; set; }

        public bool Computers { get; set; }

        public bool Speakers { get; set; }

        public int Capacity { get; set; }
    }
    }

