using Entities.Contexts;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DL
{
    public class RoomDL : IRoomDL
    {
        private readonly PsagotDbContext _context;
        public RoomDL(PsagotDbContext context)
        {
            _context = context;
        }
        public async Task<(IEnumerable<Room> Rooms, string ErrorMessage)> GetAllRooms()
        {
            try {
                var rooms = await _context.Set<Room>().ToListAsync();
                return (rooms, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
        public async Task<(Room Room, string ErrorMessage)> AddRoom(Room room)
        {
            try
            {
                var addedRoom = await _context.Set<Room>().AddAsync(room);
                await _context.SaveChangesAsync();
                return (addedRoom.Entity, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(Room Room, string ErrorMessage)> GetRoomById(int id)
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

        public async Task<(Room Room, string ErrorMessage)> UpdateRoom(Room room)
        {
            try
            {
                _context.Set<Room>().Update(room);
                await _context.SaveChangesAsync();
                return (room, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}
