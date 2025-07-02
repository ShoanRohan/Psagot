using Entities.Models;

namespace DL
{
    public interface IStatusDL
    {
        Task<(IEnumerable<StatusCourse> StatusCourses, string ErrorMessage)> GetAllStatusCourses();
        Task<(IEnumerable<StatusTopic> statusTopic, string ErrorMessage)> GetAllStatusTopics();
    }
}