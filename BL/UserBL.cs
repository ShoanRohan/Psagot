﻿using AutoMapper;
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

        public async Task<(IEnumerable<UserDTO> User, string ErrorMessage)> GetAllUsers()
        {
            var (users, errorMessage) = await _userDL.GetAllUsers();
            if (users == null) return (null, errorMessage);

            var userDTOs = _mapper.Map<IEnumerable<UserDTO>>(users);

            // הוספת שם סוג משתמש לכל משתמש
            foreach (var userDTO in userDTOs)
            {
               
                userDTO.UserTypeName = userDTO.UserTypeName;  // רק מתעדכן אם יש בעיה
            }

            return (userDTOs, null);
        }

        public async Task<(UserDTO User, string ErrorMessage)> GetUserById(int id)
        {
            var (user, errorMessage) = await _userDL.GetUserById(id);
            if (user == null) return (null, errorMessage);

            var userDTO = _mapper.Map<UserDTO>(user);

          
            userDTO.UserTypeName = user.UserType?.Name;  // הוספת שם סוג משתמש אם קיים

            return (userDTO, null);
        }





    }
}
