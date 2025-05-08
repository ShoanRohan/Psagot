using Entities.Contexts;
using Entities.DTO;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
                var addedUser = await _context.Set<User>().AddAsync(user);
                await _context.SaveChangesAsync();
                return (addedUser.Entity, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
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
                var user = await _context.Set<User>().FindAsync(id);
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
                var user = await _context.Set<User>().ToListAsync();
                return (user, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(List<CoordinatorDTO> Coordinators, string ErrorMessage)> GetCoordinators()
        {
            try
            {
                var coordinators = await _context.Set<User>()
                    .Where(u => u.UserTypeId == 3 && u.IsActive) // סינון רק רכזות פעילות
                    .Select(u => new CoordinatorDTO
                    {
                        UserId = u.UserId,
                        Name = u.Name
                    })
                    .ToListAsync();

                return (coordinators, null); // אם הכל הצליח
            }
            catch (Exception ex)
            {
                return (null, ex.Message); // אם קרתה שגיאה
            }
        }

        public async Task<User> UserLoginAsync(string email, string password)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);

            return user;
        }

    }
}
