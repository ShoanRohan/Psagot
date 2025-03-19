using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL
{
    public class UserTypeBL : IUserTypeBL
    {
        private readonly IUserTypeDL _userTypeDL;
        private readonly IMapper _mapper;

        public UserTypeBL(IUserTypeDL userTypeDL, IMapper mapper)
        {
            _userTypeDL = userTypeDL;
            _mapper = mapper;
        }

        public async Task<(UserTypesDTO UserType, string ErrorMessage)> AddUserType(UserTypesDTO userTypeDTO)
        {
            var userType = _mapper.Map<UserTypes>(userTypeDTO);
            var (addedUserType, errorMessage) = await _userTypeDL.AddUserType(userType);

            if (addedUserType == null) return (null, errorMessage);

            return (_mapper.Map<UserTypesDTO>(addedUserType), null);
        }

        public async Task<(UserTypesDTO UserType, string ErrorMessage)> UpdateUserType(UserTypesDTO userTypeDTO)
        {
            var userType = _mapper.Map<UserTypes>(userTypeDTO);
            var (updatedUserType, errorMessage) = await _userTypeDL.UpdateUserType(userType);

            if (updatedUserType == null) return (null, errorMessage);

            return (_mapper.Map<UserTypesDTO>(updatedUserType), null);
        }

        public async Task<(UserTypesDTO UserType, string ErrorMessage)> GetUserTypeById(int id)
        {
            var (userType, errorMessage) = await _userTypeDL.GetUserTypeById(id);
            if (userType == null) return (null, errorMessage);

            return (_mapper.Map<UserTypesDTO>(userType), null);
        }

        public async Task<(IEnumerable<UserTypesDTO> UserTypes, string ErrorMessage)> GetAllUserTypes()
        {
            var (userTypes, errorMessage) = await _userTypeDL.GetAllUserTypes();
            if (userTypes == null) return (null, errorMessage);

            return (_mapper.Map<IEnumerable<UserTypesDTO>>(userTypes), null);
        }
    }
}