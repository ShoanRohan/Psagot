using Entities.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

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

    
    
