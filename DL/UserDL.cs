﻿using Entities.Contexts;
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
        public async Task<User> UserLoginAsync(string email, string password)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);

            return user;
        }

        public async Task<(List<User> Users, string ErrorMessage)> GetAllCoordinators()
        {
            try
            {
                var users = await _context.Set<User>().Where(u => u.UserType.Name == "Coordinator")
                    .Include(user => user.UserType).ToListAsync();
                return (users, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        //public async Task<(List<User> Users, string ErrorMessage)> GetUsersByPage(int pageNumber, int pageSize)
        //{
        //    try
        //    {
        //        var users = await _context.Users
        //            .Skip((pageNumber - 1) * pageSize)  // דילוג על תוצאות קודמות
        //            .Take(pageSize)  // הגבלת מספר השורות
        //            .Include(user=>user.UserType)
        //            .ToListAsync();

        //        return (users, null);
        //    }
        //    catch (Exception ex)
        //    {
        //        return (null, ex.Message);
        //    }
        //}

        public async Task<List<User>> GetUsers()
        {
            try
            {
                var users = await _context.Users
                 .Select(u => new User
                 {
                     UserId=u.UserId,
                     Name = u.Name,
                     Email = u.Email,
                     UserType = u.UserType,
                     IsActive = u.IsActive,

                 })
                  .ToListAsync();
                return users;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}


