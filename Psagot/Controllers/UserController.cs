using AutoMapper;
using BL;
using DL;
using Entities.Contexts;
using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Psagot.Models;
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
        private readonly IMapper _mapper;
        private readonly string _jwtSecretKey;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserBL userBL, IMapper mapper, IConfiguration configuration, ILogger<UserController> logger)
        {
            _userBL = userBL;
            _mapper = mapper;
            _jwtSecretKey = configuration["Jwt:Key"] ?? throw new ArgumentNullException("Jwt:Key");
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] CreateUserRequest createUserRequest)
        {
            if (createUserRequest == null)
                return BadRequest("Invalid user data");

            try
            {
                var UserDTO = _mapper.Map<UserDTO>(createUserRequest);
                var createdUser = await _userBL.CreateUserAsync(UserDTO);

                var token = GenerateJwtToken(createdUser);


                return CreatedAtAction(nameof(GetUserById), new { id = createdUser.UserId }, new
                {
                    User = createdUser,
                    Token = token
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while registering user.");
                return StatusCode(500, "Internal server error");
            }
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

                var token = GenerateJwtToken(user);
                return Ok(new
                {
                    token = token,
                    userName = user.Name,
                    userId = user.UserId
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while logging in.");
                return StatusCode(500, "Internal server error");
            }
        }

        private string GenerateJwtToken(UserDTO user)
        {
            if (user.Name == null)
                throw new ArgumentNullException(nameof(user.Name));

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Name),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            if (!string.IsNullOrEmpty(user.Role))
                claims.Add(new Claim(ClaimTypes.Role, user.Role));

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSecretKey));
            var creds = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}













