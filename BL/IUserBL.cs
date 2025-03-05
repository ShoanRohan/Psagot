using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface IUserBL
    {
        Task<(UserDTO User, string ErrorMessage)> AddUser(UserDTO userDTO);
        Task<(UserDTO User, string ErrorMessage)> UpdateUser(UserDTO userDTO);
        Task<(UserDTO User, string ErrorMessage)> GetUserById(int id);
        Task<UserDTO> UserLoginAsync(string email, string password);
        Task<(IEnumerable<UserDTO> User, string ErrorMessage)> GetAllUsers();

        Task<(List<CoordinatorDTO> Coordinators, string ErrorMessage)> GetCoordinators();
    }
}

