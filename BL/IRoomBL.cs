using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Models;

namespace BL
{
    public interface IRoomBL
    {
        Task<(Room Room, string ErrorMessage)> AddRoom(Room room);
        Task<(Room Room, string ErrorMessage)> UpdateRoom(Room room);
    }
}
