using AutoMapper;
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
    public class RoomDL:IRoomDL
    {
        private readonly DbContext _contextRoom;

        public RoomDL(IRoomDL roomDL, IMapper mapper)
        {
            mapper = mapper;
        }

        public RoomDL(IRoomDL roomDL)
        {
         
        }
        public async Task<(IEnumerable<Room> Rooms, string ErrorMessage)> GetAllRooms()
        {
            try
            {
                var rooms = await _contextRoom.Set<Room>().ToListAsync();
                return (rooms, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(Room Rooms, string ErrorMessage)> GetRoomById(int id)
        {
            try
            {
                var room = await _contextRoom.Set<Room>().FindAsync(id);
                return (room, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}
