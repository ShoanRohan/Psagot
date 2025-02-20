﻿using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
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

            //userEntity.Password = BCrypt.Net.BCrypt.HashPassword(userDTO.Password);
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

        public async Task<(List<UserDTO> Users, string ErrorMessage)> GetAllCoordinators()
        {
            var (users, errorMessage) = await _userDL.GetAllCoordinators();
            if (users == null) return (null, errorMessage);

            return (_mapper.Map<List<UserDTO>>(users), null);
        }

        public async Task<(List<UserDTO> Users, string ErrorMessage)> GetUsersByPage(int pageNumber, int pageSize)
        {
            var (users, errorMessage) = await _userDL.GetUsersByPage(pageNumber, pageSize);
            if (users == null) return (null, errorMessage);

            var userDTOs = _mapper.Map<List<UserDTO>>(users);
            return (userDTOs, null);
        }

        public async Task<List<UserDTO>> GetUsers()

        {
            var users = await _userDL.GetUsers(); // קריאה לשכבת ה-DL
            var userDTOs = users.Select(u => new UserDTO { UserId = u.UserId, Name = u.Name, Email = u.Email }).ToList(); // המרה ל-DTO
            return userDTOs; ;

        }
        //public async Task<List<UserDTO>> GetUsers()
        //{
        //    var users = await _userDL.GetUsers(); // קריאה ל-DL שמחזיר List<User>

        //    var userDTOs = users.Select(u => new UserDTO
        //    {
        //        UserId = u.UserId,
        //        Name = u.Name,
        //        Email = u.Email,
        //        UserTypeId = u.UserTypeId,
        //        UserTypeName = u.UserType.Name, // אם רוצים לכלול את שם ההרשאה
        //        IsActive = u.IsActive
        //    }).ToList();
        //    if (users == null) return (null);

        //    return (_mapper.Map<List<UserDTO>>(users));
        //}
    }
}
