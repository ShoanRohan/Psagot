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
                var rooms = await _context.Rooms.ToListAsync();
                return (rooms, null);
            }
            catch (Exception ex)
            {
                return (null, $"שגיאה בעת טעינת רשימת החדרים: {ex.Message}");
            }
        }

        public async Task<(Room Room, string ErrorMessage)> GetRoomById(int id)
        {
            try
            {
                var room = await _context.Rooms.FindAsync(id);
                if (room == null)
                    return (null, "חדר לא נמצא.");
                return (room, null);
            }
            catch (Exception ex)
            {
                return (null, $"שגיאה בעת טעינת חדר: {ex.Message}");
            }
        }

        public async Task<(Room Room, string ErrorMessage)> AddRoom(Room room)
        {
            try
            {
                room.RoomId = 0;  // חשוב - איפוס ה־RoomId כדי למסד הנתונים לייצר אוטומטית
                bool exists = await _context.Rooms.AnyAsync(r => r.Name == room.Name);
                if (exists)
                    return (null, "כבר קיים חדר עם שם זהה.");

                var addedRoom = await _context.Rooms.AddAsync(room);
                await _context.SaveChangesAsync();
                return (addedRoom.Entity, null);
            }
            catch (DbUpdateException ex)
            {
                return (null, $"שגיאה בשמירת חדר למסד הנתונים: {ex.Message}");
            }
            catch (Exception ex)
            {
                return (null, $"שגיאה בלתי צפויה בעת הוספת חדר: {ex.Message}");
            }
        }


        public async Task<(Room Room, string ErrorMessage)> UpdateRoom(Room room)
        {
            try
            {
                var existingRoom = await _context.Rooms.FindAsync(room.RoomId);
                if (existingRoom == null)
                    return (null, "לא נמצא חדר לעדכון.");

                // עדכון שדות
                existingRoom.Name = room.Name;
                existingRoom.Capacity = room.Capacity;
                existingRoom.Projector = room.Projector;
                existingRoom.Computers = room.Computers;
                existingRoom.Speakers = room.Speakers;

                await _context.SaveChangesAsync();
                return (existingRoom, null);
            }
            catch (DbUpdateException ex)
            {
                return (null, $"שגיאה בעדכון חדר: {ex.Message}");
            }
            catch (Exception ex)
            {
                return (null, $"שגיאה בלתי צפויה בעת עדכון חדר: {ex.Message}");
            }
        }

        public async Task<(bool IsSuccess, string ErrorMessage)> DeleteRoom(int roomId)
        {
            try
            {
                var room = await _context.Rooms.FindAsync(roomId);
                if (room == null)
                    return (false, "החדר לא נמצא.");

                bool hasMeetings = await _context.Meetings.AnyAsync(m => m.RoomId == roomId);
                if (hasMeetings)
                    return (false, "לא ניתן למחוק חדר שיש לו פגישות משויכות.");

                _context.Rooms.Remove(room);
                await _context.SaveChangesAsync();
                return (true, null);
            }
            catch (Exception ex)
            {
                return (false, $"שגיאה במחיקת חדר: {ex.Message}");
            }
        }
    }
}
