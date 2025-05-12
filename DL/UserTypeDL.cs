using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Contexts;
using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace DL
{
    public class UserTypeDL : IUserTypeDL
    {
        private readonly PsagotDbContext _context;

        public UserTypeDL(PsagotDbContext context)
        {
            _context = context;
        }

        public async Task<(UserType UserType, string ErrorMessage)> AddUserType(UserType userType)
        {
            try
            {
                var addedUserType = await _context.Set<UserType>().AddAsync(userType);
                await _context.SaveChangesAsync();
                return (addedUserType.Entity, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(UserType UserType, string ErrorMessage)> UpdateUserType(UserType userType)
        {
            try
            {
                _context.Set<UserType>().Update(userType);
                await _context.SaveChangesAsync();
                return (userType, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(UserType UserType, string ErrorMessage)> GetUserTypeById(int id)
        {
            try
            {
                var userType = await _context.Set<UserType>().FindAsync(id);
                return (userType, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(IEnumerable<UserType> UserTypes, string ErrorMessage)> GetAllUserTypes()
        {
            try
            {
                var userTypes = await _context.Set<UserType>().ToListAsync();
                return (userTypes, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }
    }
}
