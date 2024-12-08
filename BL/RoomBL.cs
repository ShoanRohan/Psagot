using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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





        // פונקציה להחזרת כל החדרים
        public async Task<(IEnumerable<RoomDTO> Room, string ErrorMessage)> GetAllRooms()
        {
            // קריאה לשכבת DL
            var (rooms, errorMessage) = await _roomDL.GetAllRooms();

            // בדיקת תוצאה
            if (rooms == null) return (null, errorMessage);

            // מיפוי התוצאה ל-DTO והחזרה
            return (_mapper.Map<IEnumerable<RoomDTO>>(rooms), null);
        }

        // פונקציה להחזרת חדר לפי מזהה
        public async Task<(RoomDTO Room, string ErrorMessage)> GetRoomById(int id)
        {
            // קריאה לשכבת DL
            var (room, errorMessage) = await _roomDL.GetRoomById(id);

            // בדיקת תוצאה
            if (room == null) return (null, errorMessage);

            // מיפוי התוצאה ל-DTO והחזרה
            return (_mapper.Map<RoomDTO>(room), null);
        }

        
    }
}
