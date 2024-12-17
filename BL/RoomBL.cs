using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class RoomBL : IRoomBL

    {

        private readonly IRoomDL _roomDL;
        private readonly IMapper _mapper;


        public RoomBL(IRoomDL roomDL, IMapper mapper)
        {
            _roomDL = roomDL;
            _mapper = mapper;
        }





      
        public async Task<(IEnumerable<RoomDTO> Room, string ErrorMessage)> GetAllRooms()
        {
            var (rooms, errorMessage) = await _roomDL.GetAllRooms();

            if (rooms == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<RoomDTO>>(rooms), null);
        }

        public async Task<(RoomDTO Room, string ErrorMessage)> GetRoomById(int id)
        {
            var (room, errorMessage) = await _roomDL.GetRoomById(id);

            if (room == null) return (null, errorMessage);

            return (_mapper.Map<RoomDTO>(room), null);
        }

        
    }
}
