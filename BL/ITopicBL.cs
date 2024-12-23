using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.DTO;
using Entities.Models;

namespace BL
{
    public interface ITopicBL
    {
        //הפונקציה מקבלת ID של COURSE ומחזירה את כל הנושאים של הקורס הספציפי הזה
        Task<(IEnumerable<Topic> Topics, string ErrorMessage)> GetTopicById(int courseId);


    }
}
