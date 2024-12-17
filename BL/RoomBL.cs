using System.Collections.Generic;
using System.Threading.Tasks;
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

        
    }
}
