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
        Task<(User User, string ErrorMessage)> GetUserById(int id);
    }
}
