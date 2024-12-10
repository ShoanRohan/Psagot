using System.Collections.Generic;
using System.Threading.Tasks;
using BL;
using Entities.DTO;
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
        public async Task<IActionResult> AddRoom([FromBody] RoomDTO roomDTO)
        {
            var result = await _roomBL.AddRoom(roomDTO);
            if (result.Room == null) return BadRequest(result.ErrorMessage);
            return Ok(result.Room);
        }




        [HttpPut]
        public async Task<IActionResult> UpdateRoom([FromBody] RoomDTO roomDTO)
        {
            var result = await _roomBL.UpdateRoom(roomDTO);
            if (result.Room == null) return BadRequest(result.ErrorMessage);
            return Ok(result.Room);
        }

    }
}
