using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Psagot.Controllers.API.Controllers
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var (addedRoom, errorMessage) = await _roomBL.AddRoom(roomDTO);

            if (addedRoom != null) // בדוק אם הוחזר אובייקט חדר
            {
                return Ok(new { Message = "חדר נוסף בהצלחה.", Room = addedRoom });
            }
            else
            {
                return BadRequest(new { message = errorMessage }); // החזר שגיאה ברורה
            }
        }

        [HttpPut("UpdateRoom")]
        public async Task<IActionResult> UpdateRoom([FromBody] RoomDTO roomDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

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

        [HttpDelete("DeleteRoom/{roomId}")]
        public async Task<IActionResult> DeleteRoom(int roomId)
        {
            var result = await _roomBL.DeleteRoom(roomId);

            if (!result.IsSuccess)
            {
                return BadRequest(result.ErrorMessage);
            }

            return Ok(new { Message = "חדר נמחק בהצלחה." });
        }
    }
}
