using Entities.Contexts;
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
    }
}
