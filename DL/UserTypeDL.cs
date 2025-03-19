using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Contexts;
using Microsoft.EntityFrameworkCore;
using Entities.Models;
namespace DL
{
    public class UserTypeDL : IUserTypeDL
    {
        private readonly PsagotDbContext _context;

        public UserTypeDL(PsagotDbContext context)
        {
            _context = context;
        }

        public async Task<(UserTypes UserType, string ErrorMessage)> AddUserType(UserTypes userType)
        {
            try
            {
                var addedUserType = await _context.Set<UserTypes>().AddAsync(userType);
                await _context.SaveChangesAsync();
                return (addedUserType.Entity, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(UserTypes UserType, string ErrorMessage)> UpdateUserType(UserTypes userType)
        {
            try
            {
                _context.Set<UserTypes>().Update(userType);
                await _context.SaveChangesAsync();
                return (userType, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(UserTypes UserType, string ErrorMessage)> GetUserTypeById(int id)
        {
            try
            {
                var userType = await _context.Set<UserTypes>().FindAsync(id);
                return (userType, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(IEnumerable<UserTypes> UserTypes, string ErrorMessage)> GetAllUserTypes()
        {
            try
            {
                var userTypes = await _context.Set<UserTypes>().ToListAsync();
                return (userTypes, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}