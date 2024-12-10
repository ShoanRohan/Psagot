using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.DTO;
using Entities.Models;

namespace BL
{
    public interface IRoomBL
    {
        Task<(RoomDTO Room, string ErrorMessage)> AddRoom(RoomDTO roomDTO);
        Task<(RoomDTO Room, string ErrorMessage)> UpdateRoom(RoomDTO roomDTO);
    }
}
