using AutoMapper;
using DL;
using Entities.DTO;
using Entities.Models;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<(bool IsSuccess, string ErrorMessage)> AddUserType(UserTypeDTO userTypeDTO)
        {
            var userType = _mapper.Map<UserType>(userTypeDTO);
            return await _userTypeDL.AddUserType(userType);
        }

        public async Task<(bool IsSuccess, string ErrorMessage)> UpdateUserType(UserTypeDTO userTypeDTO)
        {
            var userType = _mapper.Map<UserType>(userTypeDTO);
            return await _userTypeDL.UpdateUserType(userType);
        }

        public async Task<(UserTypeDTO UserType, string ErrorMessage)> GetUserTypeById(int id)
        {
            var (userType, errorMessage) = await _userTypeDL.GetUserTypeById(id);
            if (userType == null)
                return (null, errorMessage);

            return (_mapper.Map<UserTypeDTO>(userType), null);
        }

        public async Task<(IEnumerable<UserTypeDTO> UserTypes, string ErrorMessage)> GetAllUserTypes()
        {
            var (userTypes, errorMessage) = await _userTypeDL.GetAllUserTypes();
            if (userTypes == null)
                return (null, errorMessage);

            return (_mapper.Map<IEnumerable<UserTypeDTO>>(userTypes), null);
        }
    }
}
