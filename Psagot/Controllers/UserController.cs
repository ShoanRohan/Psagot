using BL;
using Entities.DTO;
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
        private readonly string _jwtSecretKey;
        private readonly ILogger<UserController> _logger;

        public UserController(IUserBL userBL, IConfiguration configuration, ILogger<UserController> logger)
        {
            _userBL = userBL;
            _jwtSecretKey = configuration["Jwt:Key"] ?? throw new ArgumentNullException("Jwt:Key");
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
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

                var token = GenerateJwtToken(addedUser);

                return CreatedAtAction(nameof(AddUser), new { id = addedUser.UserId }, new
                {
                    User = addedUser,
                    Token = token
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while registering user.");
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

                var token = GenerateJwtToken(user);
                return Ok(new
                {
                    token = token,
                    user = user,
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