using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

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
            // אימות פרטי המשתמש
            if (string.IsNullOrEmpty(userDTO.Name))
            {
                return BadRequest("Name is required.");
            }

            if (string.IsNullOrEmpty(userDTO.Email) || !Regex.IsMatch(userDTO.Email, @"\S+@\S+\.\S+"))
            {
                return BadRequest("Invalid email format.");
            }

            var (addedUser, errorMessage) = await _userBL.AddUser(userDTO);
            if (addedUser == null)
            {

                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UserDTO userDTO)
        {
            var (updatedUser, errorMessage) = await _userBL.UpdateUser(userDTO);
            if (updatedUser == null) return BadRequest(errorMessage);

            return Ok(updatedUser);
        }

        [HttpGet("GetUserById/{id}")]
        public async Task<IActionResult> GetUserById([FromRoute] int id)
        {
            var (user, errorMessage) = await _userBL.GetUserById(id);
            if (user == null) return NotFound(errorMessage);

            return Ok(user);
        }

        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var (users, errorMessage) = await _userBL.GetAllUsers();
            if (users == null) return BadRequest(errorMessage);

            return Ok(users);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] LoginDTO login)
        {
            if (login == null)
                return BadRequest("Invalid login request");

            try
            {
                var user = await _userBL.UserLoginAsync(login.Email, login.Password);

                if (user == null)
                    return Unauthorized("Invalid email or password");
                return Ok(new
                { 
                    user = user,
                });
            }
            catch (Exception ex)
            {

                return StatusCode(500, "Internal server error");
            }
        }
    }
}