using Entities.Models;

namespace DL
{
    public interface IUserTypeDL
    {
        Task<(bool IsSuccess, string ErrorMessage)> AddUserType(UserType userType);
        Task<(IEnumerable<UserType> UserTypes, string ErrorMessage)> GetAllUserTypes();
        Task<(UserType UserType, string ErrorMessage)> GetUserTypeById(int id);
        Task<(bool IsSuccess, string ErrorMessage)> UpdateUserType(UserType userType);
    }
}