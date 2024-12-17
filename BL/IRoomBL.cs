using AutoMapper;
using DL;
using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface IRoomBL
    {
        Task<(IEnumerable<RoomDTO> Rooms, string ErrorMessage)> GetAllRooms();
        Task<(RoomDTO Room, string ErrorMessage)> GetRoomById(int id);
    }
}

    
    
