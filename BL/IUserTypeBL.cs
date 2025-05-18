using Entities.DTO;

namespace BL
{
  
    public interface IUserTypeBL
    {
        Task<(UserTypeDTO UserType, string ErrorMessage)> AddUserType(UserTypeDTO userTypeDTO);
        Task<(UserTypeDTO UserType, string ErrorMessage)> UpdateUserType(UserTypeDTO userTypeDTO);
        Task<(UserTypeDTO UserType, string ErrorMessage)> GetUserTypeById(int id);
        Task<(IEnumerable<UserTypeDTO> UserTypes, string ErrorMessage)> GetAllUserTypes();

    }
}
