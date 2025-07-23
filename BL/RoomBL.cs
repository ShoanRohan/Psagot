using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;
// הסרנו את using System; מכיוון ש-NotImplementedException כבר לא בשימוש ישיר כאן.

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
            // ולידציה ראשונית של ה-DTO, אם לא נעשתה ב-Controller
            if (roomDTO == null)
            {
                return (null, "פרטי חדר חסרים.");
            }
            // אם roomId מגיע מה-frontend, אולי תרצה לוודא שהוא מספר חיובי, וכו'.
            // שינוי כאן: RoomId יכול להיות 0 אם הוא נוצר אוטומטית במסד הנתונים
            // אם המטרה היא לוודא שלא שולחים ID שלילי/לא חוקי כקלט
            if (roomDTO.RoomId < 0)
            {
                return (null, "מספר חדר לא חוקי.");
            }

            var room = _mapper.Map<Room>(roomDTO);
            var (addedRoom, errorMessage) = await _roomDL.AddRoom(room);
            if (addedRoom == null) return (null, errorMessage);
            return (_mapper.Map<RoomDTO>(addedRoom), null);
        }

        public async Task<(RoomDTO Room, string ErrorMessage)> UpdateRoom(RoomDTO roomDTO)
        {
            var room = _mapper.Map<Room>(roomDTO);
            var (updatRoom, errorMessage) = await _roomDL.UpdateRoom(room);
            if (updatRoom == null) return (null, errorMessage);
            return (_mapper.Map<RoomDTO>(updatRoom), null);
        }

        public async Task<(RoomDTO Room, string ErrorMessage)> GetRoomById(int id)
        {
            var (room, errorMessage) = await _roomDL.GetRoomById(id);
            if (room == null) return (null, errorMessage);

            return (_mapper.Map<RoomDTO>(room), null);
        }

        public async Task<(IEnumerable<RoomDTO> Rooms, string ErrorMessage)> GetAllRooms()
        {
            var (rooms, errorMessage) = await _roomDL.GetAllRooms();
            if (rooms == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<RoomDTO>>(rooms), null);
        }

        // המתודה GenerateRoomsExcel הוסרה בהתאם לבקשה.
        // public Task<(byte[] fileContent, string fileName, string errorMessage)> GenerateRoomsExcel()
        // {
        //     throw new NotImplementedException();
        // }

        public async Task<(bool IsSuccess, string ErrorMessage)> DeleteRoom(int roomId)
        {
            return await _roomDL.DeleteRoom(roomId);
        }
    }
}