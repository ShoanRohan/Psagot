using Entities.Contexts;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{


    public class RoomDL : IRoomDL

    {
        private readonly PsagotDbContext _context;

        public RoomDL (PsagotDbContext context)
        {
            _context = context;
        }
        public Task<(Room Room, string ErrorMessage)> AddRoom(Room room)
        {
            throw new NotImplementedException();
        }

        public Task<(Room Room, string ErrorMessage)> UpdateRoom(Room room)
        {
            throw new NotImplementedException();
        }
    }
}
