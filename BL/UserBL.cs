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
            var userEntity = _mapper.Map<User>(userDTO);

            userEntity.Password = BCrypt.Net.BCrypt.HashPassword(userDTO.Password);
            var (addedUser, errorMessage) = await _userDL.AddUser(userEntity);

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
        public async Task<UserDTO> UserLoginAsync(string email, string password)
        {
            var user = await _userDL.UserLoginAsync(email, password);

            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return _mapper.Map<UserDTO>(user);
            }
            return null;
        }

        public async Task<(UserDTO User, string ErrorMessage)> GetUserById(int id)
        {
            var (user, errorMessage) = await _userDL.GetUserById(id);
            if (user == null) return (null, errorMessage);

            return (_mapper.Map<UserDTO>(user), null);
        }

        public async Task<(IEnumerable<UserDTO> User, string ErrorMessage)> GetAllUsers()
        {
            var (users, errorMessage) = await _userDL.GetAllUsers();
            if (users == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<UserDTO>>(users), null);
        }

    }
}