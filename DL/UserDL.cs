using Azure.Identity;
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
                await _context.Set<User>().AddAsync(user);
                await _context.SaveChangesAsync();

                var userWithType = await _context.Users
                    .Include(u => u.UserType)
                    .FirstOrDefaultAsync(u => u.UserId == user.UserId);

                return (userWithType, null);
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

                var userWithType = await _context.Users
                    .Include(u => u.UserType)
                    .FirstOrDefaultAsync(u => u.UserId == user.UserId);

                return (userWithType, null);
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
                var user = await _context.Users
    .Include(u => u.UserType)
    .FirstOrDefaultAsync(u => u.UserId == id);

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
        public async Task<(List<TeacherDTO> Teachers, string ErrorMessage)> GetTeachers()
        {
            try
            {
                var teachers = await _context.Set<User>()
                    .Where(u => u.UserTypeId == 4 && u.IsActive) // סינון רק מורות פעילות
                    .Select(u => new TeacherDTO
                    {
                        UserId = u.UserId,
                        Name = u.Name
                    })
                    .ToListAsync();

                return (teachers, null); // אם הכל הצליח
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

        public async Task<(IEnumerable<User> Users, string ErrorMessage)> GetCoordinatorsAndLecturers()
        {
            try
            {
                var users = await _context.Users
                    .Where(u => u.UserType != null && (u.UserType.Name == "Coordinator" || u.UserType.Name == "Lecturer"))
                    .Include(u => u.UserType)
                    .ToListAsync();

                return (users, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(IEnumerable<User> Users, int TotalCount, string ErrorMessage)> GetFilteredPagedUsers(
          string username, string phone, string role, bool? isActive, int pageNumber, int pageSize)
        {
            try
            {
                var query = _context.Set<User>().AsQueryable();

                // סינון לפי הפרמטרים שהתקבלו, תוך בדיקה שהם לא NULL כמחרוזת
                if (!string.IsNullOrEmpty(username))
                {
                    query = query.Where(u => u.Name.Contains(username)).Include(u => u.UserType).AsQueryable();
                }

                if (!string.IsNullOrEmpty(phone) && phone.ToUpper() != "NULL")
                {
                    query = query.Where(u => u.Phone.Contains(phone)).Include(u => u.UserType).AsQueryable();
                }

                if (!string.IsNullOrEmpty(role) && role.ToUpper() != "NULL")
                {
                    query = query.Join(
                        _context.UserTypes, // טבלת ה-UserType
                        user => user.UserTypeId, // השדה בטבלת Users שמצביע על ה-UserType
                        userType => userType.UserTypeId, // השדה המזהה של UserType
                        (user, userType) => new { User = user, UserType = userType }) // שילוב הנתונים
                        .Where(u => u.UserType.Name == role) // סינון לפי שם ה-Role
                        .Select(u => u.User) // חזרה לאובייקט המקורי של ה-User
                        .Include(u => u.UserType).AsQueryable();
                }

                if (isActive.HasValue)
                {
                    query = query.Where(u => u.IsActive == isActive).Include(u => u.UserType).AsQueryable();
                }

                // חישוב כמות כללית של המשתמשים שמתאימים לחיפוש
                int totalCount = await query.CountAsync();

                // דפדוף (Pagination)
                var users = await query
                    .Skip((pageNumber - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return (users, totalCount, null);
            }
            catch (Exception ex)
            {
                return (null, 0, ex.Message);
            }
        }

        public async Task<(List<User> Users, string ErrorMessage)> GetAllCoordinators()
        {
            try
            {
                var users = await _context.Set<User>().Where(u => u.UserType.Name == "רכזת")
                    .Include(user => user.UserType).ToListAsync();
                return (users, null);
            }
            catch (Exception ex)
            {
                return (null, ex.Message);
            }
        }

        public async Task<(List<User> Users, int countUsers, string ErrorMessage)> GetUsersByPage(int pageNumber, int pageSize)
        {
            try
            {
                var users = await _context.Users
                    .Skip((pageNumber - 1) * pageSize)  // דילוג על תוצאות קודמות
                    .Take(pageSize)  // הגבלת מספר השורות
                    .Include(user => user.UserType)
                    .ToListAsync();

                var countUsers = _context.Users.Count();
                return (users, countUsers, null);
            }
            catch (Exception ex)
            {
                return (null, 0, ex.Message);
            }
        }
        public async Task<(bool, string)> DeleteUser(int id)
        {

            try
            {
                var recordMeeting=  await _context.Meetings.Where(t => t.TeacherId == id).ToListAsync();
                var recordTopic =await _context.Topics.Where(t => t.TeacherId == id).ToListAsync();
                var recordCourse =await _context.Courses.Where(t => t.CoordinatorId == id).ToListAsync();
                if( recordMeeting.Any() || recordTopic.Any() || recordCourse.Any())
                {
                    return (false, "המשתמש בשימוש ואי אפשר למחוק אותו ");
                }
                var user = await _context.Users.FindAsync(id);
                if (user == null)
                    return (false, "User not found");

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                return (true, null);
            }
            catch (Exception ex)
            {
                return (false, "Error deleting user: " + ex.Message);
            }
        }
    }
}
