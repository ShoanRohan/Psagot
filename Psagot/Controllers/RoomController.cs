using BL;
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

