using Microsoft.EntityFrameworkCore;
using Entities.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.Contexts;
using Entities.DTO;

namespace DL
{
    public class UserDL : IUserDL
    {
        private readonly PsagotDbContext _context;

        public UserDL(PsagotDbContext context)
        {
            _context = context;
        }

        public async Task<(User User, string ErrorMessage)> AddUser(User user)
        {
            try
            {
                user.UserType = null;
                var addedUser = await _context.Set<User>().AddAsync(user);
                await _context.SaveChangesAsync();
                return (addedUser.Entity, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<User> GetUserByEmailAndPhone(string email, string phone)
{
    return await _context.Users
        .FirstOrDefaultAsync(u => u.Email == email && u.Phone == phone);
}


        public async Task<(User User, string ErrorMessage)> UpdateUser(User user)
        {
            try
            {
                _context.Set<User>().Update(user);
                await _context.SaveChangesAsync();
                return (user, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(User User, string ErrorMessage)> GetUserById(int id)
        {
            try
            {
                // הוספנו את ה-`Include` כדי לכלול את ה-UserType בשאילתא
                var user = await _context.Set<User>()
                    .Include(u => u.UserType)  // כאן עושים את ה-include
                    .FirstOrDefaultAsync(u => u.UserId == id);

                if (user == null)
                    return (null, "User not found");

                return (user, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(IEnumerable<User> User, string ErrorMessage)> GetAllUsers()
        {
            try
            {
                // הוספנו את ה-`Include` כדי לכלול את ה-UserType בשאילתא
                var users = await _context.Set<User>()
                    .Include(u => u.UserType)  // כאן עושים את ה-include
                    .ToListAsync();

                return (users, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
        public async Task<User> UserLoginAsync(string email, string password)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);

            return user;
        }

        public async Task<IEnumerable<UserNameIdDTO>> GetUserNamesByUserTypeId(int userTypeId)
        {
            return await _context.Users
                .Where(u => u.UserTypeId == userTypeId)
                .Select(u => new UserNameIdDTO
                {
                    UserId = u.UserId,
                    Name = u.Name
                })
                .ToListAsync();
        }

    }
}
