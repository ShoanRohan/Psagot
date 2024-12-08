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

            // פונקציה להחזרת כל החדרים
            [HttpGet("GetAllRooms")]
            public async Task<IActionResult> GetAllRooms()
            {
                // קריאה לשכבת BL
                var (rooms, errorMessage) = await _roomBL.GetAllRooms();

                // בדיקת תוצאה
                if (rooms == null)
                    return BadRequest(errorMessage);

                // החזרת רשימת החדרים
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

