using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Contexts;
using Entities.DTO;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;


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
        public async Task<(List<CourseScheduleDTO> , string ErrorMessage)> GetCourseScheduleByDate(DateTime dateTime)
        {
            try
            {
                var dayOfWeek = (int)dateTime.DayOfWeek + 1;
                var schedule =  _context.Meetings
                .Include(m => m.ScheduleForTopic)
                 .ThenInclude(sft => sft.Topic)
                 .ThenInclude(t => t.Course)  
                .Where(m => m.IsValid) 
                .Where(m => m.DayId == dayOfWeek) 
                .Where(m => m.ScheduleForTopic != null
                     && m.ScheduleForTopic.Topic != null
                     && m.ScheduleForTopic.Topic.Course != null) 
                .Where(m => dateTime >= m.ScheduleForTopic.Topic.Course.StartDate
                     && (m.ScheduleForTopic.Topic.Course.EndDate == null || dateTime <= m.ScheduleForTopic.Topic.Course.EndDate)) 
                .Select(m => new CourseScheduleDTO
            {
                 CourseName = m.ScheduleForTopic.Topic.Course.Name,
                 TopicName = m.ScheduleForTopic.Topic.Name,
                 CourseColor = m.ScheduleForTopic.Topic.Course.Color,
                 StartTime = m.StartTime ?? TimeOnly.MinValue,
                 EndTime = m.EndTime ?? TimeOnly.MaxValue
            })
             .ToList();

                return (schedule, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }

        }
    }
}
