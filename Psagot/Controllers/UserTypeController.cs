using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserTypeController : ControllerBase
    {
        private readonly IUserTypeBL _userTypeBL;

        public UserTypeController(IUserTypeBL userTypeBL)
        {
            _userTypeBL = userTypeBL;
        }

        [HttpPost]
        public async Task<IActionResult> AddUserType([FromBody] UserTypeDTO userTypeDTO)
        {
            var (isSuccess, errorMessage) = await _userTypeBL.AddUserType(userTypeDTO);
            if (!isSuccess) return BadRequest(errorMessage);

            return Ok("UserType added successfully.");
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUserType([FromBody] UserTypeDTO userTypeDTO)
        {
            var (isSuccess, errorMessage) = await _userTypeBL.UpdateUserType(userTypeDTO);
            if (!isSuccess) return BadRequest(errorMessage);

            return Ok("UserType updated successfully.");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserTypeById(int id)
        {
            var (userType, errorMessage) = await _userTypeBL.GetUserTypeById(id);
            if (userType == null) return NotFound(errorMessage);

            return Ok(userType);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUserTypes()
        {
            var (userTypes, errorMessage) = await _userTypeBL.GetAllUserTypes();
            if (userTypes == null) return BadRequest(errorMessage);

            return Ok(userTypes);
        }
    }
}
