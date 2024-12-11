using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Models;

namespace DL
{
    public interface IRoomDL
    {
        Task<(Room Room, string ErrorMessage)> AddRoom(Room room);
        Task<(Room Room, string ErrorMessage)> UpdateRoom(Room room);
    }
}

