using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL
{
    public class UserBL : IUserBL
    {
        private readonly IUserDL _userDL;
        private readonly IMapper _mapper;

        public UserBL(IUserDL userDL, IMapper mapper)
        {
            _userDL = userDL;
            _mapper = mapper;
        }

        public async Task<(UserDTO User, string ErrorMessage)> AddUser(UserDTO userDTO)
        {
            var user = _mapper.Map<User>(userDTO);
            var (addedUser, errorMessage) = await _userDL.AddUser(user);

            if (addedUser == null) return (null, errorMessage);

            return (_mapper.Map<UserDTO>(addedUser), null);
        }

        public async Task<(UserDTO User, string ErrorMessage)> UpdateUser(UserDTO userDTO)
        {
            var user = _mapper.Map<User>(userDTO);
            var (updatedUser, errorMessage) = await _userDL.UpdateUser(user);

            if (updatedUser == null) return (null, errorMessage);

            return (_mapper.Map<UserDTO>(updatedUser), null);
        }
    }
}
