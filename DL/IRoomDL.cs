using Entities.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DL
{
    public interface IRoomDL
    {
        Task<(Room Room, string ErrorMessage)> AddRoom(Room room);
        Task<(Room Room, string ErrorMessage)> UpdateRoom(Room room);
        Task<(IEnumerable<Room> Rooms, string ErrorMessage)> GetAllRooms();
        Task<(Room Room, string ErrorMessage)> GetRoomById(int id); 

    }
}

