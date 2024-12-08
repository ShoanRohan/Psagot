using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public interface IRoomDL
    {
        
        Task<(IEnumerable<Room> Rooms, string ErrorMessage)> GetAllRooms();
        Task<(Room Rooms, string ErrorMessage)> GetRoomById(int id);
         

        

    }
}
