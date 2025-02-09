using BL;
using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;

namespace Psagot.Controllers
{
    namespace API.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        public class RoomController : ControllerBase
        {
            private readonly IRoomBL _roomBL;

            public RoomController(IRoomBL roomBL)
            {
                _roomBL = roomBL;
            }

            [HttpPost("AddRoom")]
            public async Task<IActionResult> AddRoom([FromBody] RoomDTO roomDTO)
            {
                var result = await _roomBL.AddRoom(roomDTO);
                if (result.Room == null) return BadRequest(result.ErrorMessage);
                return Ok(result.Room);
            }

            [HttpPut("UpdatrRoom")]
            public async Task<IActionResult> UpdateRoom([FromBody] RoomDTO roomDTO)
            {
                var result = await _roomBL.UpdateRoom(roomDTO);
                if (result.Room == null) return BadRequest(result.ErrorMessage);
                return Ok(result.Room);
            }

            [HttpGet("GetAllRooms")]
            public async Task<IActionResult> GetAllRooms()
            {
                var (rooms, errorMessage) = await _roomBL.GetAllRooms();

                if (rooms == null)
                    return BadRequest(errorMessage);

                return Ok(rooms);
            }

            [HttpGet("GetRoomById/{id}")]
            public async Task<IActionResult> GetRoomById([FromRoute] int id)
            {
                var (room, errorMessage) = await _roomBL.GetRoomById(id);

                if (room == null)

                    return NotFound(errorMessage);

                return Ok(room);
            }
        }
    }
    }

