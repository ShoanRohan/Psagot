using AutoMapper;
using DL;
using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.DTO;
using Entities.Models;

namespace BL
{
    public interface IRoomBL
    {
        Task<(RoomDTO Room, string ErrorMessage)> AddRoom(RoomDTO roomDTO);
        Task<(RoomDTO Room, string ErrorMessage)> UpdateRoom(RoomDTO roomDTO);
        Task<(IEnumerable<RoomDTO> Rooms, string ErrorMessage)> GetAllRooms();
        Task<(RoomDTO Room, string ErrorMessage)> GetRoomById(int id);
    }
}

    
    
