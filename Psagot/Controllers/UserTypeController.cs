using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Mvc;
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

        [HttpPost("AddUserType")]
        public async Task<IActionResult> AddUserType([FromBody] UserTypeDTO userTypeDTO)
        {
            var (addedUserType, errorMessage) = await _userTypeBL.AddUserType(userTypeDTO);
            if (addedUserType == null) return BadRequest(errorMessage);

            return Ok(addedUserType);
        }

        [HttpPut("UpdateUserType")]
        public async Task<IActionResult> UpdateUserType([FromBody] UserTypeDTO userTypeDTO)
        {
            var (updatedUserType, errorMessage) = await _userTypeBL.UpdateUserType(userTypeDTO);
            if (updatedUserType == null) return BadRequest(errorMessage);

            return Ok(updatedUserType);
        }

        [HttpGet("GetUserTypeById/{id}")]
        public async Task<IActionResult> GetUserTypeById([FromRoute] int id)
        {
            var (userType, errorMessage) = await _userTypeBL.GetUserTypeById(id);
            if (userType == null) return NotFound(errorMessage);

            return Ok(userType);
        }

        [HttpGet("GetAllUserTypes")]
        public async Task<IActionResult> GetAllUserTypes()
        {
            var (userTypes, errorMessage) = await _userTypeBL.GetAllUserTypes();
            if (userTypes == null) return BadRequest(errorMessage);

            return Ok(userTypes);
        }
        //
        //הוספתי עוד שורה
    }
}
