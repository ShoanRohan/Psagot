using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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
            if (userDTO == null)
                return BadRequest("Invalid user data");
            try
            {
                var (addedUser, errorMessage) = await _userBL.AddUser(userDTO);
                if (addedUser == null)
                    return BadRequest(errorMessage);

                return CreatedAtAction(nameof(AddUser), new { id = addedUser.UserId }, new
                {
                    User = addedUser
                });
            }
            catch (Exception ex)
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

        [HttpGet("GetCoordinators")]
        public async Task<IActionResult> GetCoordinators()
        {
            var (coordinators, errorMessage) = await _userBL.GetCoordinators();
            if (coordinators == null || !coordinators.Any())
                return BadRequest(errorMessage);

            return Ok(coordinators);
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

        [HttpGet("GetAllCoordinators")]
        public async Task<IActionResult> GetAllCoordinators()
        {
            var (users, errorMessage) = await _userBL.GetAllCoordinators();
            if (users == null) return BadRequest(errorMessage);
            return Ok(users);
        }

        [HttpGet("GetCoordinatorsAndLecturers")]
        public async Task<IActionResult> GetCoordinatorsAndLecturers()
        {
            var (users, errorMessage) = await _userBL.GetCoordinatorsAndLecturers();
            if (users == null) return BadRequest(errorMessage);
            return Ok(users);
        }
    }
}
