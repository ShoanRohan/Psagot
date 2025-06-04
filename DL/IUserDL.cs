using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public interface IUserDL
    {
        Task<(User User, string ErrorMessage)> AddUser(User user);
        Task<(User User, string ErrorMessage)> UpdateUser(User user);
        Task<(IEnumerable<User> User, string ErrorMessage)> GetAllUsers();
        Task<(IEnumerable<User> Users, int TotalCount, string ErrorMessage)> GetFilteredPagedUsers(
    string username, string phone, string role, bool? isActive, int pageNumber, int pageSize);
        Task<(User User, string ErrorMessage)> GetUserById(int id);
        Task<User> UserLoginAsync(string email, string password);
        Task<(List<User> Users, string ErrorMessage)> GetAllCoordinators();
    }
}
