using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Contexts;
using Entities.Models;
using Microsoft.EntityFrameworkCore;


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
        public async Task<(Room Room, string ErrorMessage)> AddRoom(Room room)
        {
            try
            {
                // ודא ש-RoomId אינו קיים כבר אם הוא מפתח ראשי או שדה ייחודי
                if (await _context.Rooms.AnyAsync(r => r.RoomId == room.RoomId))
                {
                    return (null, "חדר עם מספר זה כבר קיים.");
                }

                var addedRoom = await _context.Set<Room>().AddAsync(room);
                await _context.SaveChangesAsync();
                return (addedRoom.Entity, null);
            }
            catch (DbUpdateException ex)
            {
                // טיפול בשגיאות מסד נתונים, לדוגמה הפרת אילוץ ייחודי
                return (null, $"שגיאה בשמירת חדר למסד הנתונים: {ex.Message}");
            }
            catch (Exception ex)
            {
                return (null, $"שגיאה בלתי צפויה בעת הוספת חדר: {ex.Message}");
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
        public async Task<(bool IsSuccess, string ErrorMessage)> DeleteRoom(int roomId)
        {
            var room = await _context.Rooms.FindAsync(roomId);
            if (room == null)
                return (false, "Room not found.");

            bool hasMeetings = await _context.Meetings.AnyAsync(m => m.RoomId == roomId);
            if (hasMeetings)
                return (false, "Cannot delete room with associated meetings.");

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();
            return (true, null);
        }

    }
}