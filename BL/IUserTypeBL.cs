using Entities.DTO;

namespace BL
{
  
    public interface IUserTypeBL
    {
        Task<(UserTypesDTO UserType, string ErrorMessage)> AddUserType(UserTypesDTO userTypeDTO);
        Task<(UserTypesDTO UserType, string ErrorMessage)> UpdateUserType(UserTypesDTO userTypeDTO);
        Task<(UserTypesDTO UserType, string ErrorMessage)> GetUserTypeById(int id);
        Task<(IEnumerable<UserTypesDTO> UserTypes, string ErrorMessage)> GetAllUserTypes();

    }
}
