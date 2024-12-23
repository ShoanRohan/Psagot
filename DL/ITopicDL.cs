using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public interface ITopicDL
    {
        //הפונקציה מקבלת ID של COURSE ומחזירה את כל הנושאים של הקורס הספציפי הזה
        Task<(IEnumerable<Topic> Topics, string ErrorMessage)> GetTopicById(int courseId);


    }
}
