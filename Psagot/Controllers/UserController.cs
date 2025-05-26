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
                return BadRequest(new { success = false, message = "Invalid user data" });

            try
            {
                var (addedUser, errorMessage) = await _userBL.AddUser(userDTO);

                if (addedUser == null)
                {
                    if (errorMessage.Contains("already exists", StringComparison.OrdinalIgnoreCase))
                    {
                        return BadRequest(new
                        {
                            success = false,
                            errorCode = "EMAIL_PHONE_EXISTS",
                            message = errorMessage
                        });
                    }

                    return BadRequest(new
                    {
                        success = false,
                        message = errorMessage ?? "Unknown error occurred"
                    });
                }

                return Ok(new
                {
                    success = true,
                    user = addedUser
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Internal server error",
                    details = ex.Message
                });
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

        [HttpGet("GetUserNamesByUserTypeId/{userTypeId}")]
        public async Task<IActionResult> GetUserNamesByUserTypeId(int userTypeId)
        {
            var userNames = await _userBL.GetUserNamesByUserTypeId(userTypeId);
            if (userNames == null || !userNames.Any())
                return NotFound("No users found with the specified user type.");

            return Ok(userNames);
        }     
    }
}