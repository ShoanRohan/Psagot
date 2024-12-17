using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.Models;

namespace DL
{ // R.T באינטרפייס רושמת רק את הכותרת של הפונקציה 
    public interface IScheduleForTopicDL
    {
        Task<(IEnumerable<ScheduleForTopic> ScheduleForTopics, string ErrorMessage)> GetAllScheduleForTopics();
    }
}
