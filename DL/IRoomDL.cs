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
        Task<(Room Room, string ErrorMessage)> AddRoom(Room room);

        Task<(Room Room, string ErrorMessage)> UpdateRoom(Room room);
    }
}
