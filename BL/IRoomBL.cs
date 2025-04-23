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
        Task<(IEnumerable<RoomDTO> Rooms, string ErrorMessage)> GetAllRooms();
        Task<(RoomDTO Room, string ErrorMessage)> GetRoomById(int id);
        Task<(List<RoomsScheduleByDateDTO>, string ErrorMessage)> GetRoomsScheduleByDate(DateTime dateTime);
        Task<(List<RoomDTO> rooms, int totalCount, string ErrorMessage)> GetAllRoomsBySearchWithPagination(
         string roomName, bool mic, bool projector, bool computer, int numOfSeats,
         int pageNumber, int pageSize, bool searchStatus);

    }
}   
