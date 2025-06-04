using Entities.DTO;
using Entities.Models;
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
        Task<(IEnumerable<UserDTO> Users, int TotalCount, string ErrorMessage)> GetFilteredPagedUsers(
      string username, string phone, string role, bool? isActive, int pageNumber, int pageSize);
        Task<UserDTO> UserLoginAsync(string email, string password);
        Task<(IEnumerable<UserDTO> User, string ErrorMessage)> GetAllUsers();
        Task<(List<UserDTO> Users, string ErrorMessage)> GetAllCoordinators();
        Task<(IEnumerable<UserDTO> users, string ErrorMassage)> GetCoordinatorsAndLecturers();

        Task<(List<CoordinatorDTO> Coordinators, string ErrorMessage)> GetCoordinators();
    }
}

