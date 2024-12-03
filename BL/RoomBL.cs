using System.Collections.Generic;
using System.Threading.Tasks;
using DL;
using Entities.Models;

namespace BL
{
    public class RoomBL : IRoomBL
    {
        private readonly IRoomDL _roomDL;

        public RoomBL(IRoomDL roomDL)
        {
            _roomDL = roomDL;
        }

        public async Task<(Room Room, string ErrorMessage)> AddRoom(Room room)
        {
            return await _roomDL.AddRoom(room);
        }

        public async Task<(Room Room, string ErrorMessage)> UpdateRoom(Room room)
        {
            return await _roomDL.UpdateRoom(room);
        }

    }
}
