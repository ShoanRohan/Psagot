using BL;
using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;

namespace Psagot.Controllers
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
        [HttpGet("GetRoomsScheduleByDate")]
        public async Task<IActionResult> GetRoomScheduleByDate([FromQuery] DateTime date)
        {
            var (schedule, errorMessage) = await _roomBL.GetRoomsScheduleByDate(date);
            if (schedule == null)
                return NotFound(errorMessage);

            return Ok(schedule);
        }
        [HttpGet("GetAllRoomsBySearchWithPagination")]
        public async Task<IActionResult> GetAllRoomsBySearchWithPagination(
         [FromQuery] string? roomName, [FromQuery] bool mic, [FromQuery] bool projector, [FromQuery] bool computer, [FromQuery] int numOfSeats,
         [FromQuery] int pageNumber, [FromQuery] int pageSize, [FromQuery] bool searchStatus)
        {
            var (rooms, totalCount, errorMessage) = await _roomBL.GetAllRoomsBySearchWithPagination(roomName, mic, projector, computer, numOfSeats, pageNumber, pageSize, searchStatus);
            if (rooms == null && totalCount == 0)
                return NotFound(errorMessage);
            return Ok(new { rooms, totalCount });
        }
    }
}

