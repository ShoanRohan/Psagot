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
        // הפונקציה מקבלת ID של TOPIC ושולפת את כל המערכת עבורו
        Task<(IEnumerable<ScheduleForTopic>, string ErrorMessage)> GetScheduleForTopicByTopicId(int topicId);


    }
}
