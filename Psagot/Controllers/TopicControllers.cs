using DL;
using Entities.Models;

namespace Psagot.Controllers
{
    public class TopicControllers
    {
        private readonly ITopicDL _topicDL;

        public TopicControllers(ITopicDL topicDL)
        {
            _topicDL = topicDL;
        }

        public async Task<(IEnumerable<Topic> Topics, string ErrorMessage)> GetTopicById(int courseId)
        {
            // קריאה ל-DL לקבלת כל הנושאים של הקורס
            (IEnumerable<Topic> topics, string errorMessage) = await _topicDL.GetTopicById(courseId);

            // אם לא נמצאו נושאים או שיש שגיאה
            if (topics == null || !topics.Any())
            {
                return (null, errorMessage ?? "No topics found for the specified course ID.");
            }

            // אם הנושאים נמצאו בהצלחה, מחזירים את הרשימה יחד עם null להודעת שגיאה
            return (topics, null);
        }
    }
}
