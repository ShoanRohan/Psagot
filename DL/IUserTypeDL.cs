using Entities.Models;

namespace DL
{
    public interface IUserTypeDL
    {
        Task<(UserTypes UserType, string ErrorMessage)> AddUserType(UserTypes userType);
        Task<(IEnumerable<UserTypes> UserTypes, string ErrorMessage)> GetAllUserTypes();
        Task<(UserTypes UserType, string ErrorMessage)> GetUserTypeById(int id);
        Task<(UserTypes UserType, string ErrorMessage)> UpdateUserType(UserTypes userType);
    }
}