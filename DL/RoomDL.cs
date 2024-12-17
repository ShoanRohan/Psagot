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
        private readonly PsagotDbContext _context;


        //private readonly DbContext _contextRoom;

        public RoomDL(PsagotDbContext context)
        {
            _context = context;
        }


     
        public async Task<(IEnumerable<Room> Rooms, string ErrorMessage)> GetAllRooms()
        {
            try
            {
                var rooms = await _context.Set<Room>().ToListAsync();
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
                var room = await _context.Set<Room>().FindAsync(id);
                return (room, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}
