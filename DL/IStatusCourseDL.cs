using Entities.Models;

namespace DL
{
    public interface IStatusCourseDL
    {
        Task<(IEnumerable<StatusCourse> StatusCourses, string ErrorMessage)> GetAllStatusCourses();
    }
}