// ייבוא של המודלים וה-DTOs הנדרשים לשכבה הזו
using Entities.DTO;

namespace BL
{
    // הגדרת הממשק IUserTypeBL
  
    public interface IUserTypeBL
    {
        Task<(UserTypeDTO UserType, string ErrorMessage)> AddUserType(UserTypeDTO userTypeDTO);
        Task<(UserTypeDTO UserType, string ErrorMessage)> UpdateUserType(UserTypeDTO userTypeDTO);
        Task<(UserTypeDTO UserType, string ErrorMessage)> GetUserTypeById(int id);
        Task<(IEnumerable<UserTypeDTO> UserTypes, string ErrorMessage)> GetAllUserTypes();

    }
}
