<<<<<<< HEAD
﻿using System;
=======
﻿using Entities.DTO;
using System;
>>>>>>> tamiKostinerJ1
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface IUserBL
    {
<<<<<<< 
=======
        Task<(UserDTO User, string ErrorMessage)> AddUser(UserDTO userDTO);
        Task<(UserDTO User, string ErrorMessage)> UpdateUser(UserDTO userDTO);
        Task<(UserDTO User, string ErrorMessage)> GetUserById(int id);
        Task<(IEnumerable<UserDTO> User, string ErrorMessage)> GetAllUsers();
>>>>>>> tamiKostinerJ1
    }
}
