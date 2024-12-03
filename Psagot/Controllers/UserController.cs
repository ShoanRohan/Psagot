using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Psagot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserBL _userBL;

        public UserController(IUserBL userBL)
        {
            _userBL = userBL;
        }

        [HttpPost("AddUser")]
        public async Task<IActionResult> AddUser([FromBody] UserDTO userDTO)
        {
            var (addedUser, errorMessage) = await _userBL.AddUser(userDTO);
            if (addedUser == null) return BadRequest(errorMessage);

            return Ok(addedUser);
        }

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UserDTO userDTO)
        {
            var (updatedUser, errorMessage) = await _userBL.UpdateUser(userDTO);
            if (updatedUser == null) return BadRequest(errorMessage);

            return Ok(updatedUser);
        }
    }
}
