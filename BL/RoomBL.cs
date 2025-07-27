using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;

namespace BL
{
    public class RoomBL : IRoomBL
    {
        private readonly IRoomDL _roomDL;
        private readonly IMapper _mapper;

        public RoomBL(IRoomDL roomDL, IMapper mapper)
        {
            _roomDL = roomDL;
            _mapper = mapper;
        }

        public async Task<(RoomDTO Room, string ErrorMessage)> AddRoom(RoomDTO roomDTO)
        {
            if (roomDTO == null)
            {
                return (null, "שגיאה: פרטי חדר חסרים.");
            }

            if (roomDTO.RoomId < 0)
            {
                return (null, "שגיאה: מספר חדר לא חוקי.");
            }

            var room = _mapper.Map<Room>(roomDTO);
            var (addedRoom, errorMessage) = await _roomDL.AddRoom(room);
            if (addedRoom == null)
                return (null, $"שגיאה בעת הוספת חדר: {errorMessage}");

            return (_mapper.Map<RoomDTO>(addedRoom), null);
        }

        public async Task<(RoomDTO Room, string ErrorMessage)> UpdateRoom(RoomDTO roomDTO)
        {
            if (roomDTO == null || roomDTO.RoomId <= 0)
            {
                return (null, "שגיאה: פרטי חדר לעדכון אינם תקינים.");
            }

            var room = _mapper.Map<Room>(roomDTO);
            var (updatedRoom, errorMessage) = await _roomDL.UpdateRoom(room);
            if (updatedRoom == null)
                return (null, $"שגיאה בעת עדכון חדר: {errorMessage}");

            return (_mapper.Map<RoomDTO>(updatedRoom), null);
        }

        public async Task<(RoomDTO Room, string ErrorMessage)> GetRoomById(int id)
        {
            var (room, errorMessage) = await _roomDL.GetRoomById(id);
            if (room == null)
                return (null, $"שגיאה: לא נמצא חדר עם מזהה {id}. {errorMessage}");

            return (_mapper.Map<RoomDTO>(room), null);
        }

        public async Task<(IEnumerable<RoomDTO> Rooms, string ErrorMessage)> GetAllRooms()
        {
            var (rooms, errorMessage) = await _roomDL.GetAllRooms();
            if (rooms == null)
                return (null, $"שגיאה בעת שליפת החדרים: {errorMessage}");

            return (_mapper.Map<IEnumerable<RoomDTO>>(rooms), null);
        }

        public async Task<(bool IsSuccess, string ErrorMessage)> DeleteRoom(int roomId)
        {
            if (roomId <= 0)
            {
                return (false, "שגיאה: מזהה חדר למחיקה אינו תקין.");
            }

            return await _roomDL.DeleteRoom(roomId);
        }
    }
}
