using Entities.DTO;

namespace BL
{
    public interface IUserTypeBL
    {
        Task<(UserTypeDTO UserType, string ErrorMessage)> AddUserType(UserTypeDTO userTypeDTO);
        Task<(IEnumerable<UserTypeDTO> UserTypes, string ErrorMessage)> GetAllUserTypes();
        Task<(UserTypeDTO UserType, string ErrorMessage)> GetUserTypeById(int id);
        Task<(UserTypeDTO UserType, string ErrorMessage)> UpdateUserType(UserTypeDTO userTypeDTO);
        Task<(bool Success, string ErrorMessage)> AddDaysForCourse(int courseId, int daysToAdd);

    }
}