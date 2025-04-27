using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Contexts;
using Entities.DTO;
using Entities.DTO;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;
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
        public async Task<(List<RoomsScheduleByDateDTO>, string ErrorMessage)> GetRoomsScheduleByDate(DateTime dateTime)
        {
            try
            {
                var dayOfWeek = (int)dateTime.DayOfWeek + 1;

                await _context.SaveChangesAsync();
                var schedule = _context.Meetings
                .Include(m => m.Day)
                .Include(m => m.ScheduleForTopic)
                 .ThenInclude(sft => sft.Topic)
                 .ThenInclude(t => t.Course)
                .Where(m => m.IsValid)
                .Where(m => m.DayId == dayOfWeek)
                .Where(m => m.ScheduleForTopic != null
                     && m.ScheduleForTopic.Topic != null
                     && m.ScheduleForTopic.Topic.Course != null)
                .Where(m => DateOnly.FromDateTime(dateTime) >= m.ScheduleForTopic.Topic.Course.StartDate
                     && (m.ScheduleForTopic.Topic.Course.EndDate == null || DateOnly.FromDateTime(dateTime) <= m.ScheduleForTopic.Topic.Course.EndDate))
                .Select(m => new RoomsScheduleByDateDTO
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
        public async Task<(List<Room> rooms, int totalCount, string ErrorMessage)> GetAllRoomsBySearchWithPagination(
         string roomName, bool mic, bool projector, bool computer, int numOfSeats,
         int pageNumber, int pageSize, bool searchStatus)
        {
            try
            {
                var query = _context.Rooms.AsQueryable(); 

                if (searchStatus)
                {
                    query = query.Where(room =>
                        (string.IsNullOrEmpty(roomName) || room.Name.Contains(roomName)) &&
                        (room.Speakers == mic || mic==false)  &&
                        (room.Projector == projector || projector == false) &&
                        (room.Computers == computer || computer == false) &&
                        (room.Capacity >= numOfSeats || numOfSeats == 0)); 
                }

                int totalCount = await query.CountAsync(); 

                var rooms = await query
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync(); 

                return (rooms, totalCount, null);
            }
            catch (Exception ex)
            {
                return (new List<Room>(), 0, ex.Message);
            }
        }
    }
    }
