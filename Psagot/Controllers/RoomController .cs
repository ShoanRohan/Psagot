using System.Collections.Generic;
using System.Threading.Tasks;
using BL;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost]
        public async Task<IActionResult> AddRoom([FromBody] Room room)
        {
            var result = await _roomBL.AddRoom(room);
            if (result.Room == null) return BadRequest(result.ErrorMessage);
            return Ok(result.Room);
        }




        [HttpPut]
        public async Task<IActionResult> UpdateRoom([FromBody] Room room)
        {
            var result = await _roomBL.UpdateRoom(room);
            if (result.Room == null) return BadRequest(result.ErrorMessage);
            return Ok(result.Room);
        }

    }
}
