using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;

namespace BL
{
    public class RoomBL : IRoomBL
    {
        private readonly IRoomDL _roomDL;
        private readonly IMapper _mapper;

        public RoomBL(IRoomDL roomDL , IMapper mapper)
        {
            _roomDL = roomDL;
            _mapper = mapper;
        }

        public async Task<(RoomDTO Room, string ErrorMessage)> AddRoom(RoomDTO roomDTO)
        {
            var room = _mapper.Map<Room>(roomDTO);
            var (addedRoom, errorMessage) = await _roomDL.AddRoom(room);
            if (addedRoom == null) return (null, errorMessage);
            return (_mapper.Map<RoomDTO>(addedRoom), null);
        }

        public async Task<(RoomDTO Room, string ErrorMessage)> UpdateRoom(RoomDTO roomDTO)
        {
            var room = _mapper.Map<Room>(roomDTO);
            var (updatRoom, errorMessage) = await _roomDL.UpdateRoom(room);
            if (updatRoom == null) return (null, errorMessage);
            return (_mapper.Map<RoomDTO>(updatRoom), null);
        }

        public async Task<(RoomDTO Room, string ErrorMessage)> GetRoomById(int id)
        {
            var (room, errorMessage) = await _roomDL.GetRoomById(id);
            if (room == null) return (null, errorMessage);

            return (_mapper.Map<RoomDTO>(room), null);
        }

        public async Task<(IEnumerable<RoomDTO> Rooms, string ErrorMessage)> GetAllRooms()
        {
            var (rooms, errorMessage) = await _roomDL.GetAllRooms();
            if (rooms == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<RoomDTO>>(rooms), null);
        }
        public async Task<(List<RoomsScheduleByDateDTO>, string ErrorMessage)> GetRoomsScheduleByDate(DateTime dateTime)
        {
            var (schedule, errorMessage) = await _roomDL.GetRoomsScheduleByDate(dateTime);
          
            if (schedule == null) return (null, errorMessage);

            return (_mapper.Map<List<RoomsScheduleByDateDTO>>(schedule), null);
        }
        public async Task<(List<RoomDTO> rooms, int totalCount, string ErrorMessage)> GetAllRoomsBySearchWithPagination(
         string roomName, bool mic, bool projector, bool computer, int numOfSeats,
         int pageNumber, int pageSize, bool searchStatus)
        {
            var (rooms, totalCount, errorMessage) = await _roomDL.GetAllRoomsBySearchWithPagination( roomName,mic,projector,computer,numOfSeats,pageNumber,pageSize,searchStatus);

            if (rooms == null&& totalCount==0) return (null,0, errorMessage);

            return (_mapper.Map<List<RoomDTO>>(rooms),( totalCount),null);
        }


    }
}
