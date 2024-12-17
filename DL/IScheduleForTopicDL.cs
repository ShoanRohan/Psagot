using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Models;

namespace DL
{
    public interface IScheduleForTopicDL
    {
        //הפונקציה מקבלת ID של COURSE ומחזירה את כל הנושאים של הקורס הספציפי הזה
        Task<IEnumerable<ScheduleForTopic>> GetScheduleForTopicById(int topicId);


        Task<IEnumerable<Topic>> GetTopicById(int courseId);


    }
}
