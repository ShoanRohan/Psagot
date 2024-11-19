using Entities.DTO;

namespace BL
{
    public interface IUserTypeBL
    {
        Task<(bool IsSuccess, string ErrorMessage)> AddUserType(UserTypeDTO userTypeDTO);
        Task<(IEnumerable<UserTypeDTO> UserTypes, string ErrorMessage)> GetAllUserTypes();
        Task<(UserTypeDTO UserType, string ErrorMessage)> GetUserTypeById(int id);
        Task<(bool IsSuccess, string ErrorMessage)> UpdateUserType(UserTypeDTO userTypeDTO);
    }
}