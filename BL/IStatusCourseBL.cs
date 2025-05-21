using Entities.DTO;

namespace BL
{
  
    public interface IStatusCourseBL
    {
        Task<(IEnumerable<StatusCourseDTO> StatusCourses, string ErrorMessage)> GetAllStatusCourses();
        Task<(IEnumerable<StatusTopicDTO> StatusTopic, string ErrorMessage)> GetAllStatusTopics();


    }
}
